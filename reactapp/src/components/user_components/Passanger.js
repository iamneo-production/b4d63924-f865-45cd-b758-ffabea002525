import React, { useState } from "react";
import { FcApproval } from "react-icons/fc";

const Passanger = ({
  handlePassangerDetails,
  allPassangerDetails,
  noOfPerson,
  ticketPrice,
}) => {
  const [passangerDetails, setPassangerDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: 0,
    price: 0,
  });

  const handleAddPassenger = () => {
    handlePassangerDetails(passangerDetails);
    clear();
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
          />
        </div>
        <div className="col-md-2" style={{ marginRight: "10px" }}>
          <input
            id="gender"
            onChange={(e) =>
              setPassangerDetails({
                ...passangerDetails,
                gender: e.target.value,
              })
            }
            className="form-control"
            type="text"
            value={passangerDetails.gender}
            placeholder="Gender"
            name="gender"
            aria-label="default input example"
          />
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
