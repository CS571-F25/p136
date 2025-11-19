import React from "react";
import Button from "react-bootstrap/Button";

export default function TeeTimeItem({ time, booked, onBook, loggedIn }) {
  return (
    <div
      className={`d-flex justify-content-between align-items-center p-3 bg-white rounded shadow-sm mb-2 ${
        booked ? "bg-secondary text-white" : ""
      }`}
    >
      <span>{time}</span>
      <Button
        variant={booked ? "dark" : "success"}
        disabled={booked || !loggedIn}
        onClick={onBook}
      >
        {booked ? "Booked" : "Book"}
      </Button>
    </div>
  );
}
