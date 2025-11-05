import React from "react";
import TeeTimeItem from "./TeeTimeItem";

export default function TeeTimeList({ teeTimes }) {
  return (
    <div className="tee-time-list">
      {teeTimes.map((tee) => (
        <TeeTimeItem key={tee.id} time={tee.time} available={tee.available} />
      ))}
    </div>
  );
}
