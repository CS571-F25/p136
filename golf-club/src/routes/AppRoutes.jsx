import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Signup from "../pages/Signup";
import ManageTeeTimes from "../pages/ManageTeeTimes";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function AppRoutes() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [bookedTeeTimes, setBookedTeeTimes] = useState([]);

  function handleCancel(id) {
    setBookedTeeTimes(prev => prev.filter(t => t.id !== id));
  }

  return (
    <Router basename="/p136">
        {/* NAVBAR */}
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <App
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              bookedTeeTimes={bookedTeeTimes}
              setBookedTeeTimes={setBookedTeeTimes}
            />
          }
        />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />

        <Route
          path="/manage"
          element={
            <ManageTeeTimes
              bookedTeeTimes={bookedTeeTimes}
              onCancel={handleCancel}
            />
          }
        />
      </Routes>
    </Router>
  );
}
