import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { RailContext } from "../context/context";
import Loading from "../Loading";
import Navbar from "./Navbar";
import Passanger from "./Passanger";
import { createBooking } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Vehicle = () => {
  const { vehicleData } = useContext(RailContext);

  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState(1);
  const [passangerDetails, setPassangerDetails] = useState([]);

  const handlePerson = (e) => {
    if (e.target.value) setPerson(parseInt(e.target.value));
    else setPerson(null);
  };

  const handlePassangerDetails = (singleDetails) => {
    const newData = [...passangerDetails, singleDetails];
    setPassangerDetails(newData);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleBooking = async (id) => {
    if (passangerDetails.length === person) {
      const obj = {
        fromDate: new Date(),
        toDate: new Date(),
        numberOfPassanger: person,
        totalPrice: vehicleData.ticketPrice,
        passengers: passangerDetails,
      };
      const response = await createBooking(id, obj);
      console.log(response);
      if (response.status === 200) {
        toast("Booking success!", {
          type: "success",
          theme: "dark",
        });
      } else {
        toast("Failed! try again", {
          type: "error",
          theme: "colored",
        });
      }
    } else {
      toast("Add passengers to book", {
        type: "error",
        theme: "colored",
      });
    }
  };

  const renderContent = () => {
    if (vehicleData === undefined || vehicleData === null) {
      return (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Link className="btn btn-dark" to="/user/dashboard">
            Go back
          </Link>
        </div>
      );
    }
    return (
      <>
        <Navbar />
        <div className="container-fluid">
          <ToastContainer />
          <div className="container" id="dashBoardBody">
            <div className="card mt-5" id="dsgrid1">
              <h5 className="card-header text-success">Available</h5>
              <div className="card-body">
                <h5 className="card-title text-center">{vehicleData.name}</h5>
                <p className="card-text">Place: {vehicleData.address}</p>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <span>From :</span>
                    <input
                      id="fillFromDate"
                      type="date"
                      className="form-control "
                    />
                  </div>
                  <div className="col-md-4">
                    <span>To :</span>
                    <input
                      id="fillToDate"
                      type="date"
                      className="form-control "
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      id="enterNoTicket"
                      value={person}
                      onChange={(e) => handlePerson(e)}
                      placeholder="Enter number of person"
                    />
                  </div>
                  <div className="col-md-4">
                    <p>Price: {vehicleData.ticketPrice} per head</p>
                  </div>
                  <div className="col-md-4">
                    <button
                      className="btn btn-dark"
                      id="bookButton"
                      onClick={() => handleBooking(vehicleData.id)}
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container my-5">
            <div className="card">
              <div className="card-header text-center text-success">
                Add Passanger Details
              </div>
              <Passanger
                handlePassangerDetails={handlePassangerDetails}
                allPassangerDetails={passangerDetails}
                noOfPerson={person}
              />
            </div>
          </div>
          {passangerDetails.length > 0 && (
            <div className="container my-5 ">
              <div className="card">
                {passangerDetails.map((data, index) => {
                  return (
                    <div key={index}>
                      {index === 0 && (
                        <div className="d-flex justify-content-between px-3">
                          <p>FirstName</p>
                          <p>LastName</p>
                          <p>Age</p>
                          <p>Gender</p>
                        </div>
                      )}
                      <div className="d-flex justify-content-between px-3">
                        <p>{data.firstName}</p>
                        <p>{data.lastName}</p>
                        <p>{data.age}</p>
                        <p>{data.gender}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };
  return <>{isLoading ? <Loading /> : renderContent()}</>;
};

export default Vehicle;
