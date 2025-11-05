import React from "react";

export default function TeeTimeItem({ time, available }) {
  return (
    <div className={`tee-time-item ${available ? "available" : "unavailable"}`}>
      <span className="time">{time}</span>
      <span className="status">
        {available ? "Available" : "Booked"}
      </span>
    </div>
  );
}
