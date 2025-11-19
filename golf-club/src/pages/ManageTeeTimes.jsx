import React from "react";
import Button from "react-bootstrap/Button";

export default function ManageTeeTimes({ bookedTeeTimes, onCancel }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Manage Your Tee Times</h2>

      {/* If the user has no bookings */}
      {(!bookedTeeTimes || bookedTeeTimes.length === 0) && (
        <p>You have no booked tee times.</p>
      )}

      {/* List of booked tee times */}
      {bookedTeeTimes && bookedTeeTimes.length > 0 && (
        <div className="list-group">
          {bookedTeeTimes.map((tee) => (
            <div
              key={tee.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{tee.time}</span>
              <Button variant="danger" onClick={() => onCancel(tee.id)}>
                Cancel
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
