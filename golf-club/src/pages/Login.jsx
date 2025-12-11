import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login({ setLoggedIn, setUsername }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value;

    if (!username || !password) {
      alert("You must provide both a username and password!");
      return;
    }

    const storedUsers = JSON.parse(sessionStorage.getItem("golfUsers") || "[]");
    const user = storedUsers.find(u => u.username === username);

    if (!user) {
      alert("No account found with this username. Please sign up first.");
      return;
    }

    if (user.password !== password) {
      alert("Incorrect password!");
      return;
    }

    setLoggedIn(true);
    setUsername(username);
    sessionStorage.setItem('loggedIn', "true");

    alert("Login successful!");
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow" style={{ minWidth: "300px", maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Log In</h2>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              ref={usernameRef}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              ref={passwordRef}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
}
