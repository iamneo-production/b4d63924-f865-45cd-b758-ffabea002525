import React, { useState } from "react";
import "../../index.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [route, setRoute] = useState(location);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark nav-bg bg-dark">
        <div className="container py-1">
          <img
            src="/trainLogo.png"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
            alt="trainLogo"
          />
          <Link className="navbar-brand" to="/admin/dashboard">
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
                  to="/admin/dashboard"
                  className={
                    route.pathname === "/admin/dashboard"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="homeButton"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/dashboard"
                  className={
                    route.pathname === "/admin/dashboard"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="DashBoardButton"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/addVehicle"
                  className={
                    route.pathname === "/admin/addVehicle"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="adminAddVehicle"
                >
                  Add Vehicle
                </Link>
              </li>
              <li className="nav-item" style={{ display: "none" }}>
                <Link
                  to="/admin/addVehicle"
                  className={
                    route.pathname === "/admin/addVehicle"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="adminVehicleProfile"
                >
                  Vehicle Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link" id="logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
