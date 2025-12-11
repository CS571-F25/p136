import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function TeeTimeItem({ time, booked, loggedIn, id }) {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded bg-white">
      <span>{time}</span>

      {loggedIn ? (
        booked ? (
          <Button variant="secondary" size="sm" disabled>
            Booked
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/book/${id}`)} // navigate to BookingConfirmation
          >
            Book
          </Button>
        )
      ) : (
        <Button variant="secondary" size="sm" disabled>
          Log in to book
        </Button>
      )}
    </div>
  );
}
