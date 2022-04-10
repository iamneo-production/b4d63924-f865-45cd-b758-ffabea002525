import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import Navbar from "./Navbar";
import Passanger from "./Passanger";
import { createBooking } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getVehicleById } from "../../api/api";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import Tooltip from "@material-ui/core/Tooltip";
const Vehicle = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState(0);
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
    if (e.target.value <= vehicleData?.capacity && e.target.value >= 0)
      setPerson(parseInt(e.target.value));
    else setPerson(vehicleData?.capacity);
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
    if (response?.status === 200) {
      setVehicleData(response.data);
    } else navigate(-1);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
    if (passangerDetails.length && passangerDetails.length === person) {
      const obj = {
        fromDate: fromDate,
        toDate: toDate,
        numberOfPassenger: person,
        totalPrice: calcPrice(),
        passengers: passangerDetails,
      };
      const response = await createBooking(id, obj);
      if (response?.status === 200) {
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

  const handleRemovePassenger = (id) => {
    const clonedPassenger = passangerDetails.filter((item, index) => {
      return index !== id;
    });
    setPassangerDetails(clonedPassenger);
  };

  const renderContent = () => {
    return (
      <>
        <Navbar />
        <div className="container-fluid">
          <ToastContainer />
          <div className="container" id="dashBoardBody">
            <div className="d-flex justify-content-between">
              <div className="card mt-5" id="dsgrid1" style={{ width: "60%" }}>
                <h5 className="card-header text-success d-flex justify-content-center">
                  Train Details
                </h5>
                <div className="d-flex justify-content-between">
                  <div
                    className="d-flex justify-content-center align-items-center py-3"
                    style={{ width: "40%" }}
                  >
                    <div
                      className="card"
                      style={{
                        width: "80%",
                        margin: "1px",
                        float: "left",
                        borderRadius: "25px",
                      }}
                    >
                      <img
                        className="card-img-top"
                        src={vehicleData?.imageUrl}
                        alt="trainImage"
                        style={{
                          height: "13rem",
                          borderRadius: "20px 20px 0px 0px",
                        }}
                      />
                      <div
                        className="card-body"
                        style={{
                          backgroundColor: "#293d3d",
                          height: "600",
                          borderRadius: "0px 0px 20px 20px",
                        }}
                      >
                        <p className="card-title">
                          <span
                            className="px-2"
                            style={{
                              color: "white",
                              backgroundColor:
                                vehicleData?.availableStatus === "Available"
                                  ? "green"
                                  : "red",
                              padding: "2px 0px",
                            }}
                          >
                            {vehicleData?.availableStatus}
                          </span>
                        </p>
                        <p className="card-title" style={{ color: "white" }}>
                          Seats Available: {vehicleData?.capacity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-body" style={{ width: "60%" }}>
                    <h4 className="card-title text-center">
                      {vehicleData?.name}
                    </h4>
                    <p className="card-text my-1" style={{ color: "#000" }}>
                      Timing : {vehicleData?.time}
                    </p>
                    <p className="card-text my-1" style={{ color: "#000" }}>
                      Place &nbsp;&nbsp;: {vehicleData?.address}
                    </p>
                    <div className="mb-3">
                      <div className="me-5 my-1">
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
                      <div className="me-5 my-1">
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
                      <div className="me-5 my-2">
                        <span>Number of Passenger :</span>
                        <input
                          type="number"
                          className="form-control"
                          id="enterNoTicket"
                          value={person}
                          onChange={(e) => handlePerson(e)}
                          placeholder="Enter number of person"
                          max={vehicleData?.capacity}
                          min={1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card mt-5 d-flex justify-content-end"
                id="dsgrid1"
                style={{ width: "30%" }}
              >
                <h5 className="card-header text-success d-flex justify-content-center ">
                  Price Details
                </h5>
                <div
                  className="card-body"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ color: "#000" }}>
                    Price: &#8377;{vehicleData?.ticketPrice} per head{" "}
                  </p>
                  <div className="">
                    <p
                      className="py-2 px-2"
                      style={{
                        backgroundColor: "#f8d7da",
                        width: "100%",
                        color: "#000",
                      }}
                    >
                      <strong>Price Breakups :</strong>
                    </p>
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <th scope="row"></th>
                          <td style={{ color: "grey" }}>
                            x {passangerDetails.length}
                          </td>
                          <td style={{ color: "grey" }}>=</td>
                          <td style={{ color: "grey" }}>
                            &#8377;
                            {vehicleData?.ticketPrice * passangerDetails.length}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row"></th>
                          <td style={{ color: "grey" }}>
                            Discount{" "}
                            <Tooltip
                              title="10% discount for senior citizens"
                              placement="top"
                              style={{ paddingLeft: 5 }}
                            >
                              <span variant="text">
                                <BsFillInfoCircleFill />
                              </span>
                            </Tooltip>
                          </td>
                          <td style={{ color: "grey" }}>=</td>
                          <td style={{ color: "grey" }}>
                            &#8377;
                            {vehicleData?.ticketPrice *
                              passangerDetails.length -
                              calcPrice()}
                          </td>
                        </tr>
                        <tr style={{ backgroundColor: "#d1e7dd" }}>
                          <th scope="row"></th>
                          <td>
                            <strong>Total Price</strong>
                          </td>
                          <td>
                            <strong>=</strong>
                          </td>
                          <td>
                            <strong>&#8377;{calcPrice()}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      bottom: 25,
                    }}
                  >
                    <button
                      className="btn btn-success px-5"
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
          {vehicleData?.availableStatus === "Available" &&
            passangerDetails.length < person && (
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
            )}
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
                      <th scope="col">
                        <span>
                          Price{" "}
                          <Tooltip
                            title="10% discount for senior citizens"
                            placement="top"
                            style={{ paddingLeft: 5 }}
                          >
                            <span variant="text">
                              <BsFillInfoCircleFill />
                            </span>
                          </Tooltip>
                        </span>
                      </th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {passangerDetails?.map((data, index) => {
                      return (
                        <tr key={index + 1000}>
                          <th scope="row">{index + 1}</th>
                          <td>{data.firstName}</td>
                          <td>{data.lastName}</td>
                          <td>{data.age}</td>
                          <td>{data.gender}</td>
                          <td>{data.price}</td>
                          <td>
                            <MdDeleteOutline
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => handleRemovePassenger(index)}
                            />
                          </td>
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
