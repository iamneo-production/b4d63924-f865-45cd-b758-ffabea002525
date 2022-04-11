import React from "react";
import "../../index.css";
import { FaSearch } from "react-icons/fa";

const Searchcomponent = (props) => {
  const { value, onChange } = props;
  return (
    <div className="container">
      <div
        className="input-group mb-3"
        style={{
          display: "flex",
          alignItems: "center",
          border: "0px",
          justifyContent: "center",
        }}
      >
        <div className="form-group has-search" style={{ width: "80%" }}>
          <span className="form-control-feedback">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Type here to search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            id="searchButton"
          />
        </div>
      </div>
    </div>
  );
};

export default Searchcomponent;
