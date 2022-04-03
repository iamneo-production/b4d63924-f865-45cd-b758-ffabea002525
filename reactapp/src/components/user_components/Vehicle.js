import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { RailContext } from "../context/context";
import Loading from "../Loading";
import Navbar from "./Navbar";
import Passanger from "./Passanger";
import { createBooking } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getVehicleById } from "../../api/api";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Tooltip from "@material-ui/core/Tooltip";
const Vehicle = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState(1);
  const [passangerDetails, setPassangerDetails] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);

  const todayDate = new Date().toISOString().slice(0, 10);
  const [fromDate, setFromDate] = useState(todayDate);
  const [toDate, setToDate] = useState(todayDate);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15).toString();

  function dateToString(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      date.getFullYear(),
      dateToString(date.getMonth() + 1),
      dateToString(date.getDate()),
    ].join("-");
  }

  const handlePerson = (e) => {
    if (e.target.value) setPerson(parseInt(e.target.value));
    else setPerson(null);
  };

  const handlePassangerDetails = (singleDetails) => {
    const newData = [...passangerDetails, singleDetails];
    setPassangerDetails(newData);
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getVehicleById("user", id);
    console.log(response);
    if (response?.status === 200) {
      setVehicleData(response.data);
      console.log("Success");
    } else navigate(-1);
    setIsLoading(false);
    return;
  };

  const calcPrice = () => {
    let price = 0;
    for (let i = 0; i < passangerDetails.length; i++) {
      price = price + passangerDetails[i].price;
    }
    return price;
  };

  const handleBooking = async (id) => {
    if (passangerDetails.length === person) {
      const obj = {
        fromDate: fromDate,
        toDate: toDate,
        numberOfPassenger: person,
        totalPrice: calcPrice(),
        passengers: passangerDetails,
      };
      const response = await createBooking(id, obj);
      console.log(response);
      if (response.status === 200) {
        toast("Booking success!", {
          type: "success",
          theme: "dark",
        });
        setTimeout(() => {
          navigate(-1);
        }, 2000);
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
    return (
      <>
        <Navbar />
        <div className="container-fluid">
          <ToastContainer />
          <div className="container" id="dashBoardBody">
            <div className="card mt-5" id="dsgrid1">
              <h5 className="card-header text-success">Available</h5>
              <div className="card-body">
                <h5 className="card-title text-center">{vehicleData?.name}</h5>
                <p className="card-text">Place: {vehicleData?.address}</p>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <span>From :</span>
                    <input
                      id="fillFromDate"
                      type="date"
                      className="form-control "
                      value={fromDate}
                      onChange={(e) => {
                        setFromDate(e.target.value);
                      }}
                      min={new Date().toISOString().slice(0, 10)}
                      max={formatDate(maxDate)}
                    />
                  </div>
                  <div className="col-md-4">
                    <span>To :</span>
                    <input
                      id="fillToDate"
                      type="date"
                      className="form-control "
                      value={toDate}
                      onChange={(e) => {
                        setToDate(e.target.value);
                      }}
                      min={new Date().toISOString().slice(0, 10)}
                      max={formatDate(maxDate)}
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
                    <p>Price: &#8377;{vehicleData?.ticketPrice} per head </p>
                    <p>
                      Total Price: &#8377;{calcPrice()}{" "}
                      <Tooltip
                        title="10% discount for senior citizens"
                        placement="top"
                        style={{ paddingLeft: 5 }}
                      >
                        <span variant="text">
                          <BsFillInfoCircleFill />
                        </span>
                      </Tooltip>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <button
                      className="btn btn-dark"
                      id="bookButton"
                      onClick={() => handleBooking(vehicleData?.id)}
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
                Add Passanger
              </div>
              <Passanger
                handlePassangerDetails={handlePassangerDetails}
                allPassangerDetails={passangerDetails}
                noOfPerson={person}
                ticketPrice={vehicleData?.ticketPrice}
              />
            </div>
          </div>
          {passangerDetails?.length > 0 && (
            <div className="container my-5 ">
              <div className="card">
                <div className="card-header text-center text-success">
                  Passanger Details:
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">FirstName</th>
                      <th scope="col">LastName</th>
                      <th scope="col">Age</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passangerDetails?.map((data, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{data.firstName}</td>
                          <td>{data.lastName}</td>
                          <td>{data.age}</td>
                          <td>{data.gender}</td>
                          <td>{data.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
