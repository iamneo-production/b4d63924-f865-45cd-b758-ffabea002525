import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import Navbar from "./Navbar";
import "./MyBooking.css";
import Loading from "../Loading";
import { getMyBookings, deleteBooking, editBooking } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyBooking = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState([]);
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const [enableEdit, setEnableEdit] = useState(null);

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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      fetchData();
    }, 1000);
  }, []);

  const fetchData = async () => {
    const response = await getMyBookings();
    console.log(response);
    if (response?.status === 200) {
      setBookingData(response.data);
    }
  };
  const cancelBooking = async (id) => {
    const response = await deleteBooking(id);
    console.log(response);
    if (response.status === 200) {
      fetchData();
      toast("Booking cancelled!", {
        type: "success",
        theme: "dark",
      });
    }
  };

  const enableEditBooking = (item, index) => {
    setEnableEdit(index);
    if (item.fromDate) setFromDate(item.fromDate);
    if (item.toDate) setToDate(item.toDate);
  };

  const cancelEditing = () => {
    setEnableEdit(null);
  };

  const saveEditBooking = async (item) => {
    const { id, numberOfPassenger, totalPrice, passengers } = item;
    const obj = {
      id,
      fromDate: fromDate,
      toDate: toDate,
      numberOfPassenger,
      totalPrice,
      passengers,
    };
    const response = await editBooking(id, obj);
    console.log(response);
    if (response?.status === 200) {
      fetchData();
      toast("Booking Edited!", {
        type: "success",
        theme: "dark",
      });
    } else {
      toast("Editing Failed", {
        type: "error",
        theme: "colored",
      });
    }
    cancelEditing();
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <ToastContainer />
          <div
            className="container p-4 m-5 pb-5 bg-light bg-darken-lg text-dark 
        text-dark font-weight-bold border border-dark rounded mx-auto"
            id="MyBookingBody"
          >
            <h4 className="text-center bg-dark text-white mt-0 mb-5 p-3">
              Booking Details
            </h4>
            {bookingData.length === 0 && <div>No Train Booked</div>}
            {bookingData?.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    marginTop: "40px",
                    border: "1px solid #6a040f",
                    borderRadius: 15,
                    boxShadow: "5px 10px 18px #888888",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "2% 8%",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "limegreen",
                        padding: 10,
                        borderRadius: 250,
                        border: "0.5px solid limegreen",
                        boxShadow: "2px 5px 12px grey",
                        color: "#000",
                      }}
                    >
                      #{index + 1}
                    </div>
                    <button
                      type="button"
                      style={{
                        width: 150,
                        justifyContent: "space-between",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="mt-3 btn btn-danger border border-dark"
                      onClick={() => enableEditBooking(item, index)}
                    >
                      Edit Booking
                      <FaPen></FaPen>
                    </button>
                  </div>
                  <div className="space" style={{ marginTop: "20px" }}>
                    <div className="row">
                      <div className="col">
                        <p style={{ margin: 0 }}>Train Name:</p>
                        <input
                          className="rounded font-italic text-black border border-dark p-2"
                          type="text"
                          placeholder="Train Name"
                          disabled
                          value={item.vehicle.name}
                          readOnly
                        />
                      </div>
                      <div className="col">
                        <p style={{ margin: 0 }}>Train Route:</p>
                        <input
                          className="rounded font-italic text-dark border 
                    border-dark p-2 mb-4"
                          type="text"
                          placeholder="Address"
                          disabled
                          value={item.vehicle.address}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p style={{ margin: 0 }}>From Date:</p>
                        <input
                          className="rounded font-italic text-dark border 
                    border-dark p-2"
                          id="editBookingDate"
                          type="date"
                          placeholder="Edit From Date"
                          value={
                            enableEdit === index ? fromDate : item.fromDate
                          }
                          onChange={(e) => setFromDate(e.target.value)}
                          min={new Date().toISOString().slice(0, 10)}
                          max={formatDate(maxDate)}
                          readOnly={enableEdit === index ? false : true}
                        />
                      </div>
                      <div className="col">
                        <p style={{ margin: 0 }}>To Date:</p>
                        <input
                          className="rounded font-italic text-dark border border-dark 
                    p-2 mb-4"
                          id="editBookingDate"
                          type="date"
                          placeholder="Edit To Date"
                          value={enableEdit === index ? toDate : item.toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          min={new Date().toISOString().slice(0, 10)}
                          max={formatDate(maxDate)}
                          readOnly={enableEdit === index ? false : true}
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <p style={{ margin: 0 }}>Number of Passenger:</p>
                        <input
                          className="rounded font-italic text-dark border 
                    border-dark p-2 mb-4"
                          id="editNoOfPerson"
                          type="text"
                          placeholder="No Of Person"
                          value={item.numberOfPassenger}
                          readOnly
                        />
                      </div>
                      <div className="col">
                        <p style={{ margin: 0 }}>Total Price:</p>
                        <input
                          className="rounded font-italic text-dark border border-dark p-2"
                          type="text"
                          placeholder="Total Price"
                          value={item.totalPrice}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  {item.passengers?.length > 0 && (
                    <div className="my-1" style={{ margin: "0% 8%" }}>
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
                            </tr>
                          </thead>
                          <tbody>
                            {item.passengers?.map((data, index) => {
                              return (
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>{data.firstName}</td>
                                  <td>{data.lastName}</td>
                                  <td>{data.age}</td>
                                  <td>{data.gender}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      marginBottom: 15,
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <button
                      type="button"
                      id="cancelBookingButton"
                      className={
                        enableEdit === index
                          ? "mt-3 btn btn-warning border border-dark"
                          : "mt-3 btn btn-danger border border-dark"
                      }
                      onClick={() =>
                        enableEdit === index
                          ? cancelEditing()
                          : cancelBooking(item.id)
                      }
                    >
                      {enableEdit === index
                        ? "Cancel Editing"
                        : "Cancel Booking"}
                    </button>
                    {enableEdit === index && (
                      <button
                        type="button"
                        id="cancelBookingButton"
                        className={"mt-3 btn btn-success border border-dark"}
                        onClick={() => saveEditBooking(item)}
                        style={{ marginLeft: 10 }}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MyBooking;
