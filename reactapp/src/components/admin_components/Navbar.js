import React from "react";
import "../../index.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark nav-bg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            T-rails
          </a>
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
              <li className="nav-item">
                <Link
                  to="/admin/addVehicle"
                  className="nav-link active"
                  id="adminAddVehicle"
                >
                  Add Vehicle
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/Dashboard"
                  className="nav-link"
                  id="adminVehicleProfile"
                >
                  Vehicle Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link" id="logout">
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
