import React, { Component, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { Container, Paper } from "@material-ui/core";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
import { RailContext } from "../context/context";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../common/Loading";
import { getVehicleById, deleteVehicle, editVehicle } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeletePopup from "../common/DeletePopup";

const UpdateVehicle = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [timing, setTiming] = useState("");
  const [fromTo, setfromTo] = useState("");
  const [imageURL, setImageUrl] = useState("");
  const [fair, setFair] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");

  useEffect(async () => {
    await fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getVehicleById("admin", id);
    console.log(response);
    if (response?.status === 200) {
      const vehicleData = response.data;
      console.log("Success");
      setName(vehicleData?.name);
      setTiming(vehicleData?.time);
      setfromTo(vehicleData?.address);
      setImageUrl(vehicleData?.imageUrl);
      setFair(vehicleData?.ticketPrice);
      setCapacity(vehicleData?.capacity);
      setDescription(vehicleData?.description);
    } else navigate(-1);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const [nameError, setNameError] = useState(false);
  const [timingError, setTimingError] = useState(false);
  const [fromToError, setFromToError] = useState(false);
  const [imageUrlError, setImageUrlError] = useState(false);
  const [fairError, setFairError] = useState(false);
  const [capacityError, setCapacityError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    if (name === "") setNameError(true);
    else setNameError(false);
    if (timing === "") setTimingError(true);
    else setTimingError(false);
    if (fromTo === "") setFromToError(true);
    else setFromToError(false);
    if (imageURL === "") setImageUrlError(true);
    else setImageUrlError(false);
    if (fair === "") setFairError(true);
    else setFairError(false);
    if (capacity === "") setCapacityError(true);
    else setCapacityError(false);
    if (description === "") setDescriptionError(true);
    else setDescriptionError(false);

    const vehicle = {
      name,
      imageUrl: imageURL,
      address: fromTo,
      description,
      availableStatus: "Available",
      time: timing,
      capacity,
      ticketPrice: fair,
    };

    const response = await editVehicle(id, vehicle);
    console.log(response);
    if (response?.status === 200) {
      toast("Success!, Vehicle edited", {
        type: "success",
        theme: "dark",
      });
    } else {
      toast("Failed, Try again", {
        type: "error",
        theme: "colored",
      });
    }
  };

  const deleteVeh = async () => {
    document.getElementById("closeModal").click();
    console.log("delete");
    const response = await deleteVehicle(id);
    console.log(response);
    if (response?.status === 200) {
      toast("Success!, Vehicle removed", {
        type: "success",
        theme: "dark",
      });
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } else {
      toast("Failed, Try again", {
        type: "error",
        theme: "colored",
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Navbar />
          <ToastContainer />
          <div
            className="container my-5 p-5"
            style={{ backgroundColor: "#fff", borderRadius: 10 }}
            id="vehicleProfileBody"
          >
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            ></link>
            <div className="container">
              <div className="row">
                <br></br>
                <center>
                  <h3
                    className="d-flex justify-content-center py-2 mb-5"
                    style={{ backgroundColor: "#000", color: "#fff" }}
                    id="editVehicle"
                  >
                    Edit Vehicle
                  </h3>
                </center>
                <script src="https://kit.fontawesome.com/yourcode.js"></script>
                <div
                  className="col-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="card"
                    style={{
                      margin: "1px",
                      float: "left",
                      borderRadius: "45px",
                      width: "80%",
                    }}
                    id="adminProfileView"
                  >
                    <img
                      className="card-img-top"
                      src={imageURL}
                      alt="trainImage"
                      style={{
                        height: "300px",
                        borderRadius: "20px 20px 0px 0px",
                      }}
                      onErrorCapture={(e) => {
                        e.target.src =
                          "https://images.moneycontrol.com/static-mcnews/2021/08/Indian-Railways.jpg?impolicy=website&width=770&height=431";
                      }}
                    />
                    <div
                      className="card-body"
                      style={{
                        backgroundColor: " #293d3d",
                        borderRadius: "0px 0px 20px 20px",
                        width: "100%",
                      }}
                    >
                      <center>
                        <h5 className="card-title" style={{ color: "white" }}>
                          {name}
                        </h5>
                      </center>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <form
                    className="needs-validation"
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="editName"
                      label="Enter Name"
                      variant="outlined"
                      fullWidth
                      value={name}
                      error={nameError}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={{ marginTop: "10px" }}
                    />
                    <br />

                    <TextField
                      id="editTiming"
                      label="Enter Available Timing"
                      variant="outlined"
                      fullWidth
                      value={timing}
                      error={timingError}
                      onChange={(e) => setTiming(e.target.value)}
                      required
                      style={{ marginTop: "10px" }}
                    />
                    <br />

                    <TextField
                      id="editFromTo"
                      label="Enter the From and To"
                      variant="outlined"
                      fullWidth
                      value={fromTo}
                      error={fromToError}
                      onChange={(e) => setfromTo(e.target.value)}
                      required
                      style={{ marginTop: "10px" }}
                    />
                    <br />

                    <TextField
                      id="editImageUrl"
                      label="Enter the Image Url"
                      variant="outlined"
                      fullWidth
                      value={imageURL}
                      error={imageUrlError}
                      onChange={(e) => setImageUrl(e.target.value)}
                      required
                      style={{ marginTop: "10px" }}
                    />
                    <br />

                    <TextField
                      id="editPrice"
                      label="Enter the fair per person"
                      variant="outlined"
                      fullWidth
                      value={fair}
                      error={fairError}
                      onChange={(e) => setFair(e.target.value)}
                      required
                      style={{ marginTop: "10px" }}
                    />
                    <br />

                    <TextField
                      id="editCapacity"
                      label="Enter no of capacity"
                      variant="outlined"
                      fullWidth
                      value={capacity}
                      error={capacityError}
                      onChange={(e) => setCapacity(e.target.value)}
                      required
                      style={{ marginTop: "10px" }}
                    />
                    <br />

                    <TextField
                      id="editDescription"
                      label="Description about product"
                      variant="outlined"
                      fullWidth
                      value={description}
                      error={descriptionError}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      style={{ marginTop: "10px" }}
                    />
                    <br />

                    <br></br>
                    <center>
                      <Button
                        variant="contained"
                        id="updateButton"
                        color="secondary"
                        onClick={(e) => handleClick(e)}
                        style={{ backgroundColor: "#198754" }}
                      >
                        Update
                      </Button>
                    </center>
                  </form>
                </div>
                <div className="col-2">
                  <center className="mt-5">
                    <button
                      type="button"
                      id="addButton"
                      className="mt-3 btn btn-danger border border-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      style={{ backgroundColor: "#570000" }}
                    >
                      <i
                        className="fa fa-trash-o"
                        style={{
                          font: "150px",
                          color: "white",
                          marginRight: "10px",
                        }}
                      />
                      Delete Vehicle
                    </button>
                  </center>
                </div>
                <DeletePopup
                  onSubmit={deleteVeh}
                  label="You will not be able to recover this vehicle"
                  id={id}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default UpdateVehicle;
