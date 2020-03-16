import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  const handleLogout = () => {
    props.clearUser();
    props.history.push("/");
  };

  return (
    <header>
      <h1 className="site-title">CapStone</h1>
      <nav>
        <ul className="container">
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {props.hasUser ? (
          <li>
            <Link className="nav-link" to="/future">
              Future Projects
            </Link>
          </li>
          ) : null}
          {props.hasUser ? (
          <li>
            <Link className="nav-link" to="/active">
              Active Projects
            </Link>
          </li>
          ) : null}
          {props.hasUser ? (
          <li>
            <Link className="nav-link" to="/complete">
              Completed Projects
            </Link>
          </li>
          ) : null}
          {props.hasUser ? (
          <li>
            <Link className="nav-link" to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
          ) : (
          <li>
            <Link className="nav-link" to="/login">
              Login/Register
            </Link>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(NavBar)
