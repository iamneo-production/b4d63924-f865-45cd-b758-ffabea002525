import React from 'react';
 import '../../index.css';

const Navbar = () => {
  return <nav className="navbar navbar-expand-lg navbar-dark nav-bg">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">T-rails</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <a className="nav-link active" id="homeButton" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" id="DashBoardButton">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="myBookingButton" href="#">MyBooking</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="logout">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>;
};

export default Navbar;
