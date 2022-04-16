import React, { useEffect } from "react";
import Navbar from "./Navbar";
import "../../index.css";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { addVehicle } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../common/Loading";

export default function AddVehicle() {
  const [name, setName] = useState("");
  const [timing, setTiming] = useState("");
  const [fromTo, setfromTo] = useState("");
  const [imageURL, setImageUrl] = useState("");
  const [fair, setFair] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let [nameError, setNameError] = useState(false);
  let [timingError, setTimingError] = useState(false);
  let [fromToError, setFromToError] = useState(false);
  let [imageUrlError, setImageUrlError] = useState(false);
  let [fairError, setFairError] = useState(false);
  let [capacityError, setCapacityError] = useState(false);
  let [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    if (name === "") {
      setNameError(true);
      return;
    } else setNameError(false);
    if (timing === "") {
      setTimingError(true);
      return;
    } else setTimingError(false);
    if (fromTo === "") {
      setFromToError(true);
      return;
    } else setFromToError(false);
    if (imageURL === "") {
      setImageUrlError(true);
      return;
    } else setImageUrlError(false);
    if (fair === "") {
      setFairError(true);
      return;
    } else setFairError(false);
    if (capacity === "") {
      setCapacityError(true);
      return;
    } else setCapacityError(false);
    if (description === "") {
      setDescriptionError(true);
      return;
    } else setDescriptionError(false);

    const vehicleDetail = {
      address: fromTo,
      availableStatus: "Available",
      capacity: capacity,
      description: description,
      imageUrl: imageURL,
      name: name,
      ticketPrice: fair,
      time: timing,
    };
    const response = await addVehicle(vehicleDetail);
    if (response?.status === 200) {
      toast("Success!, Vehicle added", {
        type: "success",
        theme: "dark",
      });
      clearData();
    } else {
      toast("Failed, Try again", {
        type: "error",
        theme: "colored",
      });
    }
  };

  const clearData = () => {
    setName("");
    setTiming("");
    setfromTo("");
    setImageUrl("");
    setFair("");
    setCapacity("");
    setDescription("");
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <ToastContainer />
          <div
            className="container my-5 p-5"
            style={{ backgroundColor: "#fff", borderRadius: 10 }}
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
                  >
                    Add Vehicle
                  </h3>
                </center>
                <script src="https://kit.fontawesome.com/yourcode.js"></script>
                <div
                  className="col-5"
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
                      borderRadius: "25px",
                      width: "70%",
                    }}
                  >
                    <img
                      className="card-img-top"
                      src={imageURL}
                      alt="Add correct URL to view preview"
                      style={{
                        height: "300px",
                        borderRadius: "25px 25px 0px 0px",
                      }}
                      onErrorCapture={(e) => {
                        e.target.src = "/defaultTrain.jpg";
                      }}
                    />
                    <div
                      className="card-body"
                      style={{
                        backgroundColor: " #293d3d",
                        borderRadius: "0px 0px 20px 20px",
                        width: "100%",
                        minHeight: "65px",
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
                      id="addName"
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
                      id="addTiming"
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
                      id="addFromTo"
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
                      id="addImageUrl"
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
                      id="addPrice"
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
                      id="Traincapacity"
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
                      id="addDescription"
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
                        id="addButton"
                        color="secondary"
                        onClick={(e) => handleClick(e)}
                        style={{
                          backgroundColor: "#198754",
                          padding: "8px 50px",
                        }}
                      >
                        Submit
                      </Button>
                    </center>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
