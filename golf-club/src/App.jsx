import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import TeeTimeList from "./components/TeeTimeList";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App({
  loggedIn,
  setLoggedIn,
  bookedTeeTimes,
  setBookedTeeTimes
}) {
  
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateTeeTimes = () => {
    const times = [];
    let hour = 8;
    let minute = 0;
    while (hour < 15 || (hour === 15 && minute === 0)) {
      const timeStr = `${hour}:${minute.toString().padStart(2, "0")} ${
        hour < 12 ? "AM" : "PM"
      }`;
      times.push({ time: timeStr, booked: false });
      minute += 12;
      if (minute >= 60) {
        minute -= 60;
        hour += 1;
      }
    }
    return times;
  };

  const [teeTimes, setTeeTimes] = useState(generateTeeTimes());

  const changeDay = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  const changeWeek = (offset) => changeDay(offset * 7);

  const bookTime = (index) => {
    if (!loggedIn) return;
    const newTeeTimes = [...teeTimes];
    newTeeTimes[index].booked = true;
    setTeeTimes(newTeeTimes);
  };

return (
    <div className="min-vh-100 bg-light">

      {/* DATE NAVIGATION */}
      <div className="d-flex justify-content-center align-items-center gap-2 mt-4 fs-5 fw-semibold">
        <Button variant="secondary" onClick={() => changeWeek(-1)}>{"<<"}</Button>
        <Button variant="secondary" onClick={() => changeDay(-1)}>{"<"}</Button>

        <span className="mx-2">Tee Times for {currentDate.toDateString()}</span>

        <Button variant="secondary" onClick={() => changeDay(1)}>{">"}</Button>
        <Button variant="secondary" onClick={() => changeWeek(1)}>{">>"}</Button>
      </div>

      {/* TEE TIMES LIST */}
      <div className="container mt-4">
        {!loggedIn && (
          <p className="text-center text-danger fw-medium mb-3">
            Log in or sign up to book a tee time.
          </p>
        )}

        <TeeTimeList
          teeTimes={teeTimes}
          onBook={bookTime}
          loggedIn={loggedIn}
        />
      </div>
    </div>
  );
}


