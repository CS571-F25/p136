import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import App from "../App";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ManageTeeTimes from "../pages/ManageTeeTimes";
import BookingConfirmation from "../pages/BookingConfirmation";
import Navbar from "../components/Navbar";

export default function AppRoutes() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const saved = JSON.parse(sessionStorage.getItem("golfLoginStatus"));
    return saved?.loggedIn || false;
  });

  const [username, setUsername] = useState(() => {
    const saved = JSON.parse(sessionStorage.getItem("golfLoginStatus"));
    return saved?.username || "";
  });

  const [bookedTeeTimes, setBookedTeeTimes] = useState(() => {
    const saved = sessionStorage.getItem("golfBookings");
    return saved ? JSON.parse(saved) : [];
  });

 // const [bookedTeeTimes, setBookedTeeTimes] = useState(() => {
  //  if (!username) return [];
  //  const saved = sessionStorage.getItem(`golfBookings-${username}`);
  //  return saved ? JSON.parse(saved) : [];
  //});

  // Save login state whenever it changes
  useEffect(() => {
    sessionStorage.setItem(
      "golfLoginStatus",
      JSON.stringify({ loggedIn, username })
    );
  }, [loggedIn, username]);

  useEffect(() => {
    if (username) {
      sessionStorage.setItem(`golfBookings-${username}`, JSON.stringify(bookedTeeTimes));
    }
  }, [bookedTeeTimes, username]);
  // Load bookings whenever username changes
  useEffect(() => {
    if (username) {
      const stored = sessionStorage.getItem(`golfBookings-${username}`);
      setBookedTeeTimes(stored ? JSON.parse(stored) : []);
    } else {
      setBookedTeeTimes([]);
    }
  }, [username]);

  // Save bookings whenever they change
//  useEffect(() => {
//    sessionStorage.setItem("golfBookings", JSON.stringify(bookedTeeTimes));
//  }, [bookedTeeTimes]);

// Cancel a booked tee time
  function handleCancel(id) {
  // Find the booking to get its date
    const booking = bookedTeeTimes.find(t => t.id === id);
  
    if (booking) {
    // Update the tee time in sessionStorage to mark it as not booked
      const dateKey = `teeTimes-${booking.date}`;
      const stored = sessionStorage.getItem(dateKey);
    
      if (stored) {
        const times = JSON.parse(stored);
        const updatedTimes = times.map(t =>
          t.id === id ? { ...t, booked: false } : t
        );
        sessionStorage.setItem(dateKey, JSON.stringify(updatedTimes));
      }
    }
  
  // Remove from bookedTeeTimes
  setBookedTeeTimes(prev => prev.filter(t => t.id !== id));
}

  return (
    <Router basename="/p136/">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} username={username} />

      <Routes>
        {/* HOME / TEE TIMES */}
        <Route
          path="/"
          element={
            <App
              loggedIn={loggedIn}
              username={username}
              bookedTeeTimes={bookedTeeTimes}
              setBookedTeeTimes={setBookedTeeTimes}
            />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />}
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={<Signup setLoggedIn={setLoggedIn} setUsername={setUsername} />}
        />

        {/* BOOKING CONFIRMATION */}
        <Route
          path="/book/:id"
          element={
            <BookingConfirmation
              bookedTeeTimes={bookedTeeTimes}
              setBookedTeeTimes={setBookedTeeTimes}
              username={username}
            />
          }
        />

        {/* MANAGE BOOKINGS */}
        <Route
          path={`/manage`}
          element={
            <ManageTeeTimes
              bookedTeeTimes={bookedTeeTimes}
              onCancel={handleCancel}
              username={username}
            />
          }
        />
      </Routes>
    </Router>
  );
}