import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App"; // TeeTimes page
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ManageTeeTimes from "../pages/ManageTeeTimes";

export default function AppRoutes({ loggedIn, setLoggedIn }) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
        {loggedIn && <Route path="/manage" element={<ManageTeeTimes />} />}
      </Routes>
    </Router>
  );
}
