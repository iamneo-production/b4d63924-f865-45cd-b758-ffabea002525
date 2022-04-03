import React, { useState } from "react";
import { FcApproval } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Passanger = ({
  handlePassangerDetails,
  allPassangerDetails,
  noOfPerson,
  ticketPrice,
}) => {
  const [passangerDetails, setPassangerDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "SELECTGENDER",
    age: 0,
    price: 0,
  });

  const handleAddPassenger = () => {
    if (
      passangerDetails.firstName &&
      passangerDetails.lastName &&
      passangerDetails.age &&
      passangerDetails.gender !== "SELECTGENDER"
    ) {
      console.log(passangerDetails);
      handlePassangerDetails(passangerDetails);
      clear();
      return;
    } else {
      toast("Add all fields", {
        type: "error",
        theme: "colored",
      });
    }
  };

  const clear = () => {
    setPassangerDetails({
      firstName: "",
      lastName: "",
      gender: "",
      age: 0,
      price: 0,
    });
  };

  return (
    <div className="card-body">
      <ToastContainer />
      <h5>Add Person </h5>
      <div className="d-flex align-items-center">
        <div className="col-md-3" style={{ marginRight: "10px" }}>
          <input
            id="firstName"
            onChange={(e) =>
              setPassangerDetails({
                ...passangerDetails,
                firstName: e.target.value,
              })
            }
            className="form-control"
            type="text"
            value={passangerDetails.firstName}
            name="firstName"
            placeholder="First name"
            aria-label="default input example"
            required
          />
        </div>
        <div className="col-md-3" style={{ marginRight: "10px" }}>
          <input
            id="lastName"
            onChange={(e) =>
              setPassangerDetails({
                ...passangerDetails,
                lastName: e.target.value,
              })
            }
            className="form-control"
            type="text"
            value={passangerDetails.lastName}
            name="lastName"
            placeholder="Last name"
            aria-label="default input example"
            required
          />
        </div>
        <div className="col-md-2" style={{ marginRight: "10px" }}>
          <input
            id="age"
            onChange={(e) => {
              let price = 0;
              if (e.target.value >= 60) price = ticketPrice * 0.9;
              else price = ticketPrice;
              setPassangerDetails({
                ...passangerDetails,
                age: e.target.value,
                price: price,
              });
            }}
            className="form-control"
            type="text"
            value={passangerDetails.age}
            placeholder="Age"
            name="age"
            aria-label="default input example"
            required
          />
        </div>
        <div className="col-md-2" style={{ marginRight: "10px" }}>
          <select
            name="gender"
            id="gender"
            className="form-control"
            placeholder="Gender"
            onChange={(e) =>
              setPassangerDetails({
                ...passangerDetails,
                gender: e.target.value,
              })
            }
            value={passangerDetails.gender}
            required
          >
            <option value="SELECTGENDER">--select gender --</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-success"
            onClick={() => handleAddPassenger()}
            disabled={allPassangerDetails?.length >= noOfPerson}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Passanger;
