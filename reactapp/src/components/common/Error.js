import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";
export default Error = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <img
        src="/Error.png"
        alt="ErrorImage"
        style={{ width: 900, height: 500 }}
      />
      <Link to="/user/dashboard" className="btn nav-bg text-white">
        Go Back
      </Link>
    </div>
  );
};
