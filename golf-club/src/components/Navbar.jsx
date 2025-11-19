import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Navbar({ loggedIn, setLoggedIn }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-2">
      <div className="container-fluid">
        {/* Brand / Home */}
        <Link className="navbar-brand fw-bold" to="/">Golf Club</Link>

        {/* Navbar links */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Home link always */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {!loggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Log In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            )}

            {loggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/manage">Manage Tee Times</Link>
                </li>
                <li className="nav-item">
                <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => setLoggedIn(false)}
                >
                    Log Out
                  </Button>
                </li>           
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
