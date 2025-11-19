import React from "react";
import TeeTimeItem from "./TeeTimeItem";

export default function TeeTimeList({ teeTimes, onBook, loggedIn }) {
  return (
    <div className="tee-time-list">
      {teeTimes.map((tee, index) => (
        <TeeTimeItem
          key={index}
          time={tee.time}
          booked={tee.booked}
          onBook={() => onBook(index)}
          loggedIn={loggedIn}
        />
      ))}
    </div>
  );
}
