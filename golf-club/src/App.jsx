import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import TeeTimeList from "./components/TeeTimeList";
import WeatherDisplay from "./components/WeatherDisplay";

export default function App({ loggedIn, username, bookedTeeTimes, setBookedTeeTimes }) {
  // Get tomorrow's date consistently
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };

  const [currentDate, setCurrentDate] = useState(getTomorrow());
  const [teeTimes, setTeeTimes] = useState([]);

  function generateTeeTimes(date) {
    const times = [];
    let hour = 8;
    let minute = 0;
    while (hour < 15 || (hour === 15 && minute === 0)) {
      // Convert to 12-hour format
      let displayHour = hour;
      if (hour > 12) {
        displayHour = hour - 12;
      }
      const ampm = hour < 12 ? "AM" : "PM";
      const timeStr = `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
      
      times.push({
        id: crypto.randomUUID(),
        time: timeStr,
        date: date.toDateString(),
        booked: false
      });
      minute += 12;
      if (minute >= 60) { minute -= 60; hour++; }
    }
    return times;
  }

  // Load tee times for current date
  useEffect(() => {
    const dateKey = `teeTimes-${currentDate.toDateString()}`;
    const saved = sessionStorage.getItem(dateKey);
    
    if (saved) {
      const parsedTimes = JSON.parse(saved);
      setTeeTimes(parsedTimes);
    } else {
      const newTimes = generateTeeTimes(currentDate);
      setTeeTimes(newTimes);
      sessionStorage.setItem(dateKey, JSON.stringify(newTimes));
    }
  }, [currentDate]);

  // Update sessionStorage whenever teeTimes change (but not on initial load)
  useEffect(() => {
    if (teeTimes.length > 0) {
      const dateKey = `teeTimes-${currentDate.toDateString()}`;
      sessionStorage.setItem(dateKey, JSON.stringify(teeTimes));
    }
  }, [teeTimes, currentDate]);

  // Helper function to check if we can navigate backward
  const canGoBack = () => {
    const tomorrow = getTomorrow();
    return currentDate > tomorrow;
  };

  // Helper function to check if we can navigate forward
  const canGoForward = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    maxDate.setHours(0, 0, 0, 0);
    return currentDate < maxDate;
  };

  const changeDay = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset);
    newDate.setHours(0, 0, 0, 0);
    
    // Check boundaries
    const tomorrow = getTomorrow();
    
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    maxDate.setHours(0, 0, 0, 0);
    
    // Only update if within valid range
    if (newDate >= tomorrow && newDate <= maxDate) {
      setCurrentDate(newDate);
    }
  };

  const changeWeek = (offset) => changeDay(offset * 7);

  return (
    <div className="min-vh-100 bg-light">
      {/* WEATHER DISPLAY */}
      <WeatherDisplay />

      {/* DATE NAVIGATION */}
      <div className="d-flex justify-content-center align-items-center gap-2 mt-4 fs-5 fw-semibold">
        <Button 
          variant="secondary" 
          onClick={() => changeDay(-1)}
          disabled={!canGoBack()}
        >
          {"<"}
        </Button>
        <span className="mx-2">Tee Times for {currentDate.toDateString()}</span>
        <Button 
          variant="secondary" 
          onClick={() => changeDay(1)}
          disabled={!canGoForward()}
        >
          {">"}
        </Button>
      </div>
      <div className="container mt-4">
        {!loggedIn && (
          <p className="text-center text-danger fw-medium mb-3">
            Log in or sign up to book a tee time.
          </p>
        )}
        {teeTimes.length === 0 ? (
          <p className="text-center">Loading tee times...</p>
        ) : (
          <TeeTimeList
            teeTimes={teeTimes}
            loggedIn={loggedIn}
            username={username}
          />
        )}
      </div>
    </div>
  );
}