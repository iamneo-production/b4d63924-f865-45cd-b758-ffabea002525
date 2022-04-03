import React from "react";
import "../index.css";
import { FaSearch } from "react-icons/fa";

const Searchcomponent = (props) => {
  const { value, onChange } = props;
  return (
    <div className="container">
      <div
        className="input-group mb-3"
        style={{ display: "flex", alignItems: "center", border: "0px" }}
      >
        <div class="form-group has-search" style={{ width: "100%" }}>
          <span class="form-control-feedback">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Type here to search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Searchcomponent;
