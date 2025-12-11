import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export default function BookingConfirmation({     
  bookedTeeTimes,
  setBookedTeeTimes,
  username
}) {
  const { id } = useParams();
  //const teeTime = teeTimes.find(t => t.id === id);

  const navigate = useNavigate();

  const [players, setPlayers] = useState(1);
  const [cart, setCart] = useState(false);
  const [teeTime, setTeeTime] = useState(null);


  // Load existing bookings from sessionStorage on mount
  //useEffect(() => {
  //  const stored = sessionStorage.getItem("golfBookings");
  //  if (stored) {
  //    setBookedTeeTimes(JSON.parse(stored));
  //  }
  //}, [setBookedTeeTimes]);
 //   useEffect(() => {
 //   let times = teeTimes;
 //   if (!times || times.length === 0) {
      // fallback: load from sessionStorage
 //     const todayKey = `teeTimes-${new Date().toDateString()}`;
 //     const stored = sessionStorage.getItem(todayKey);
 //     times = stored ? JSON.parse(stored) : [];
 //   }

 //   const selected = times.find(t => t.id === id);
 //   if (!selected) {
 //     alert("Tee time not found");
 //     navigate("/");
 //     return;
//    }
//    setTeeTime(selected);
//  }, [teeTimes, id, navigate]);

  // Load existing bookings from sessionStorage
  useEffect(() => {
    console.log("Looking for tee time with id:", id);
    const stored = sessionStorage.getItem("golfBookings");
    if (stored) {
      setBookedTeeTimes(JSON.parse(stored));
    }
  }, [setBookedTeeTimes]);

//function handleConfirm() {
  // mark the tee time as booked
//  const updatedTeeTimes = teeTimes.map(t =>
//    t.id === id ? { ...t, booked: true } : t
//  );
 // setTeeTimes(updatedTeeTimes);

  // create the booking with date/time info
//  const newBooking = {
//    ...teeTime,
//    players,
//    cart
//  };

//  const updatedBookings = [...bookedTeeTimes, newBooking];
//  setBookedTeeTimes(updatedBookings);

  // save to sessionStorage
//  sessionStorage.setItem(`teeTimes-${teeTime.date}`, JSON.stringify(updatedTeeTimes));
//  sessionStorage.setItem("golfBookings", JSON.stringify(updatedBookings));

//  navigate("/manage");
//}

//function handleConfirm() {
//  if (!teeTime) {
//    alert("Tee time not found");
//    return;
//  }
  
  // Mark the tee time as booked in sessionStorage
//  const dateKey = `teeTimes-${teeTime.date}`;
//  const stored = sessionStorage.getItem(dateKey);
//  if (stored) {
//    const times = JSON.parse(stored);
//    const updatedTimes = times.map(t =>
//      t.id === id ? { ...t, booked: true } : t
//    );
//    sessionStorage.setItem(dateKey, JSON.stringify(updatedTimes));
//  }

  // Create the booking with all info
//  const newBooking = {
//    ...teeTime,
//    booked: true,
//    players,
//    cart
//  };

//  const updatedBookings = [...bookedTeeTimes, newBooking];
//  setBookedTeeTimes(updatedBookings);
//  sessionStorage.setItem("golfBookings", JSON.stringify(updatedBookings));

//  navigate("/manage");
//}
    function handleConfirm() {
  // Find the tee time directly from sessionStorage
  const allKeys = Object.keys(sessionStorage).filter(key => key.startsWith('teeTimes-'));
  let foundTeeTime = null;
  let dateKey = null;
  
  for (const key of allKeys) {
    const stored = sessionStorage.getItem(key);
    if (stored) {
      const times = JSON.parse(stored);
      const match = times.find(t => t.id === id);
      if (match) {
        foundTeeTime = match;
        dateKey = key;
        break;
      }
    }
  }
  
  if (!foundTeeTime) {
    alert("Tee time not found");
    return;
  }
  
  // Mark the tee time as booked in sessionStorage
  const stored = sessionStorage.getItem(dateKey);
  if (stored) {
    const times = JSON.parse(stored);
    const updatedTimes = times.map(t =>
      t.id === id ? { ...t, booked: true } : t
    );
    sessionStorage.setItem(dateKey, JSON.stringify(updatedTimes));
  }

  // Create the booking with all info
  const newBooking = {
    ...foundTeeTime,
    booked: true,
    players,
    cart,
    username
  };

  const updatedBookings = [...bookedTeeTimes, newBooking];
  setBookedTeeTimes(updatedBookings);
  //sessionStorage.setItem("golfBookings", JSON.stringify(updatedBookings));
  sessionStorage.setItem(`golfBookings-${username}`, JSON.stringify(updatedBookings));
  navigate(`/manage`);
  }

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <Card className="p-4 shadow" style={{ width: "24rem" }}>
        <h3 className="text-center mb-3">Confirm Your Booking</h3>

        {/* PLAYERS */}
        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Select
            value={players}
            onChange={e => setPlayers(Number(e.target.value))}
          >
            <option value={1}>1 Player</option>
            <option value={2}>2 Players</option>
            <option value={3}>3 Players</option>
            <option value={4}>4 Players</option>
          </Form.Select>
        </Form.Group>

        {/* GOLF CART */}
        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            label="Add Golf Cart"
            checked={cart}
            onChange={e => setCart(e.target.checked)}
          />
        </Form.Group>

        {/* BUTTONS */}
        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Confirm Booking
          </Button>
        </div>
      </Card>
    </div>
  );
}
