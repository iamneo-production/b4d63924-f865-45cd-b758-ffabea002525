import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RailContext } from "../context/context";
import "./../../index.css";

const Traincard = ({ trainItem }) => {
  const { TrainPassangerHandle } = useContext(RailContext);
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
    <div className="col-md-4 my-2">
      <Link to="/user/vehicles" className="text-decoration-none">
        <div className="card" onClick={() => TrainPassangerHandle(id)}>
          <img
            src={imageUrl}
            className="card-img-top"
            alt="trainImg"
            style={{ height: "18rem" }}
          />
          <div className="card-body">
            <h5 className="card-title text-black">{name}</h5>
            <p className="card-text text-black">Place : {address} </p>
            <p className="card-text text-black">Timing : {time}</p>
            <p className="card-text text-black">
              Price : {ticketPrice} per head
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Traincard;
