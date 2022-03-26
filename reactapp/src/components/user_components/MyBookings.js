import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import Navbar from "./Navbar";
import "./MyBooking.css";
import Loading from "../Loading";
import { getMyBookings, deleteBooking } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyBooking = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState([]);

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <ToastContainer />
          <div
            className="container p-4 m-5 bg-light bg-darken-lg text-dark 
        text-dark font-weight-bold border border-dark rounded mx-auto"
            id="MyBookingBody"
          >
            <h4 className="text-center bg-dark text-white mt-0 mb-5 p-3">
              Booking Details
            </h4>
            {bookingData.length === 0 && <div>No Train Booked</div>}
            {bookingData?.map((item, index) => {
              return (
                <div key={index} style={{ marginTop: "40px" }}>
                  <div className="space">
                    <div className="row">
                      <div className="col">
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
                        <input
                          className="rounded font-italic text-dark border 
                    border-dark p-2"
                          id="editBookingDate"
                          type="date"
                          placeholder="Edit From Date"
                          value={item.fromDate}
                          readOnly
                        />
                      </div>
                      <div className="col">
                        <input
                          className="rounded font-italic text-dark border border-dark 
                    p-2 mb-4"
                          id="editBookingDate"
                          type="date"
                          placeholder="Edit To Date"
                          value={item.toDate}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <input
                          className="rounded font-italic text-dark border 
                    border-dark p-2 mb-4"
                          id="editNoOfPerson"
                          type="text"
                          placeholder="No Of Person"
                          value={item.numberOfPassanger}
                          readOnly
                        />
                        <FaPen className="editIcon"></FaPen>
                      </div>
                      <div className="col">
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
                  <div className="cancelbtn">
                    <button
                      type="button"
                      id="cancelBookingButton"
                      className="mt-3 btn btn-danger border border-dark"
                      onClick={() => cancelBooking(item.id)}
                    >
                      Cancel Booking
                    </button>
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
