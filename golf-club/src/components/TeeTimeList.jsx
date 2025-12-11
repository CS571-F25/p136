import React from "react";
import TeeTimeItem from "./TeeTimeItem";

export default function TeeTimeList({ teeTimes, loggedIn, username }) {
  return (
    <div className="tee-time-list">
      {teeTimes.map((tee) => (
        <TeeTimeItem
          key={tee.id}
          id={tee.id}
          time={tee.time}
          booked={tee.booked}
          loggedIn={loggedIn}
          username={username}
        />
      ))}
    </div>
  );
}