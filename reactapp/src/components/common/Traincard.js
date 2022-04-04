import React, { useContext } from "react";
import { RailContext } from "../context/context";
import "../../index.css";
import { BsArrowRightCircle } from "react-icons/bs";

const Traincard = ({ trainItem, navigateToBooking, isAdmin, index }) => {
  const {
    name,
    imageUrl,
    ticketPrice,
    time,
    address,
    id,
    capacity,
    availableStatus,
    description,
  } = trainItem;

  return (
    <div
      className="col-md-4 my-2 py-0"
      style={{ overflow: "hidden" }}
      id={`grid${index}`}
    >
      <div
        className="my-0 py-0"
        onClick={() => navigateToBooking(id)}
        style={{
          overflow: "hidden",
          borderRadius: 10,
          padding: 0,
          margin: 0,
          backgroundColor: "#fff",
          boxShadow: "2px 1px 10px #888888",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <img
          src={imageUrl}
          className="card-img-top"
          alt="trainImg"
          style={{ height: "18rem" }}
          onErrorCapture={(e) => {
            e.target.src =
              "https://images.moneycontrol.com/static-mcnews/2021/08/Indian-Railways.jpg?impolicy=website&width=770&height=431";
          }}
        />
        <div className="card-body">
          <center>
            <h5 className="card-title text-black">{name}</h5>
          </center>
          <p className="card-text text-black py-1">
            Place &nbsp;&nbsp;: {address}{" "}
          </p>
          <p className="card-text text-black py-1">Timing : {time}</p>
          <p className="card-text text-black py-1">
            Price &nbsp;&nbsp;&nbsp;&nbsp;: &#8377;{ticketPrice} per head
          </p>
          <div
            className="py-1"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="card-text text-black">Available Seats : {capacity}</p>
            <span
              className="py-1"
              style={{
                border: "1px solid blue",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 10px",
                borderRadius: 5,
                backgroundColor: "#d4e3fa",
                color: "#0d6efd",
              }}
            >
              {isAdmin ? "Edit" : "Book"}
              <BsArrowRightCircle
                style={{ marginLeft: 10, color: "#0d6efd" }}
              />
            </span>
          </div>
        </div>
        <span
          className="available"
          style={{
            backgroundColor:
              availableStatus === "Available" ? "#d1e7dd" : "#f8d7da",
            color: availableStatus === "Available" ? "green" : "red",
            border:
              availableStatus === "Available"
                ? "1px solid green"
                : "1px solid red",
          }}
        >
          {availableStatus}
        </span>
        <div
          className="py-0 my-0"
          style={{
            height: 10,
            backgroundColor: "#737a85",
            zIndex: 10,
            borderTop: "0px",
            border: "1px solid #000",
            borderRadius: "0px 0px 25px 25px",
          }}
        />
      </div>
    </div>
  );
};
export default Traincard;
