import React from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

export default function ManageTeeTimes({ bookedTeeTimes, onCancel, username }) {
  // Optional: sort by date + time
  //const { username } = useParams();
  //const userBookings = bookedTeeTimes.filter(b => b.username === username);

  const sortedBookings = [...bookedTeeTimes].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA - dateB;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Manage Your Tee Times</h2>

      {sortedBookings.length === 0 ? (
        <p>You have no booked tee times.</p>
      ) : (
        <div className="list-group">
          {sortedBookings.map((tee) => (
            <div
              key={tee.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{tee.date} - {tee.time}</strong><br />
                Players: {tee.players || 1}<br />
                Cart: {tee.cart ? "Yes" : "No"}
              </div>

              <Button
                variant="danger"
                onClick={() => onCancel(tee.id)}
              >
                Cancel
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
