import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-bg bg-dark">
      <div className="container py-1">
        <img
          src="/trainLogo.png"
          style={{ width: "40px", height: "40px", marginRight: "10px" }}
          alt="trainLogo"
        />
        <Link className="navbar-brand" to="/user/dashboard">
          T-rails
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item" style={{ display: "none" }}>
              <Link
                className="nav-link active"
                id="homeButton"
                to="/user/dashboard"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/user/dashboard"
                id="DashBoardButton"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/user/booking"
                id="myBookingButton"
                href="#"
              >
                MyBooking
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout" id="logout">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
