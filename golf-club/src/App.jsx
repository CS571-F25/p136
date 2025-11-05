import React, { useState } from "react";
import TeeTimeList from "./components/TeeTimeList";
import "./App.css";

export default function App() {
  const [teeTimes, setTeeTimes] = useState([
    { id: 1, time: "7:00 AM", available: true },
    { id: 2, time: "7:15 AM", available: true },
    { id: 3, time: "7:30 AM", available: false },
    { id: 4, time: "7:45 AM", available: true },
    { id: 5, time: "8:00 AM", available: false },
  ]);

  return (
    <div className="app-container">
      <h1>Golf Club Tee Times</h1>
      <TeeTimeList teeTimes={teeTimes} />
    </div>
  );
}
