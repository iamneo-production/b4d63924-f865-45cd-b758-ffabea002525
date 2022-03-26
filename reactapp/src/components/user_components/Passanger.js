import React, { useState } from "react";
import { FcApproval } from "react-icons/fc";

const Passanger = ({
  handlePassangerDetails,
  allPassangerDetails,
  noOfPerson,
}) => {
  const [passangerDetails, setPassangerDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: 0,
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
    });
  };

  return (
    <div className="card-body">
      <h5>Person </h5>
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-3">
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
        <div className="col-md-3">
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
        <div className="col-md-2">
          <input
            id="age"
            onChange={(e) =>
              setPassangerDetails({ ...passangerDetails, age: e.target.value })
            }
            className="form-control"
            type="text"
            value={passangerDetails.age}
            placeholder="Age"
            name="age"
            aria-label="default input example"
          />
        </div>
        <div className="col-md-2">
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
