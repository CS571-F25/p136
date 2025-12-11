import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export default function Signup({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("You must provide both a username and password!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match!");
      return;
    }

    const storedUsers = JSON.parse(sessionStorage.getItem("golfUsers") || "[]");

    if (storedUsers.some(u => u.username === username)) {
      setError("That username is already taken!");
      return;
    }

    const updatedUsers = [...storedUsers, { username, password }];
    sessionStorage.setItem("golfUsers", JSON.stringify(updatedUsers));

    // Log the user in immediately
    setLoggedIn(true);
    sessionStorage.setItem("loggedIn", "true");
    setUsername(username); 

    alert("Sign up successful!");
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow" style={{ minWidth: "300px", maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Sign Up</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}
