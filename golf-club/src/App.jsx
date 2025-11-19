import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loggedIn, setLoggedIn] = useState(false);

  const teeTimes = [
    { time: "8:00 AM" },
    { time: "9:10 AM" },
    { time: "10:20 AM" },
  ];

  const changeDay = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  const changeWeek = (offset) => {
    changeDay(offset * 7);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* NAVIGATION BAR */}
      <nav className="w-full bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Golf Tee Times</h1>
        <div className="space-x-4">
          <Button variant="ghost">Tee Times</Button>
          {!loggedIn && (
            <>
              <Button variant="ghost" onClick={() => setLoggedIn(true)}>Log In</Button>
              <Button variant="ghost">Sign Up</Button>
            </>
          )}
          {loggedIn && (
            <>
              <Button variant="ghost">Manage Tee Times</Button>
              <Button variant="ghost" onClick={() => setLoggedIn(false)}>Log Out</Button>
            </>
          )}
        </div>
      </nav>

      {/* DATE NAVIGATION */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <Button onClick={() => changeWeek(-1)}>{"<<"}</Button>
        <Button onClick={() => changeDay(-1)}>{"<"}</Button>
        <h2 className="text-lg font-semibold">
          {currentDate.toDateString()}
        </h2>
        <Button onClick={() => changeDay(1)}>{">"}</Button>
        <Button onClick={() => changeWeek(1)}>{">>"}</Button>
      </div>

      {/* TEE TIMES LIST */}
      <div className="max-w-xl mx-auto mt-10 p-4">
        {!loggedIn && (
          <p className="text-center text-red-600 font-medium mb-4">
            Log in or sign up to book a tee time.
          </p>
        )}

        <div className="grid gap-4">
          {teeTimes.map((t, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <span className="text-lg font-semibold">{t.time}</span>
              {loggedIn ? (
                <Button>Book</Button>
              ) : (
                <Button disabled>Book</Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
