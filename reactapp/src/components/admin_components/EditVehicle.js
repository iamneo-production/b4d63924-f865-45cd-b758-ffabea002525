import React, { Component, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { Container, Paper } from "@material-ui/core";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
import { RailContext } from "../context/context";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import { getVehicleById, deleteVehicle, editVehicle } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateVehicle = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const paperstyle = { padding: "50px 20px", width: 900, margin: "40px auto" };

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
    setIsLoading(false);
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
    const response = await deleteVehicle(id);
    console.log(response);
    if (response?.status === 200) {
      toast("Success!, Vehicle removed", {
        type: "success",
        theme: "dark",
      });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
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
          <Paper elevation={7} style={paperstyle}>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            ></link>
            <div className="container">
              <div className="row" style={{ borderRadius: "50px" }}>
                <br></br>
                <center>
                  <h3>Edit Vehicle</h3>
                </center>
                <div className="col-9">
                  <br></br>
                </div>

                <script src="https://kit.fontawesome.com/yourcode.js"></script>
                <div className="col-4">
                  <div
                    className="card"
                    style={{
                      width: "1000",
                      margin: "1px",
                      float: "left",
                      borderRadius: "25px",
                    }}
                  >
                    <img
                      className="card-img-top"
                      src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/4/12/w900X450/Train.jpg?w=400&dpr=2.6"
                      alt="trainImage"
                      style={{
                        height: "500",
                        borderRadius: "20px 20px 0px 0px",
                      }}
                    />
                    <div
                      className="card-body"
                      style={{
                        backgroundColor: " #293d3d",
                        height: "600",
                        borderRadius: "0px 0px 20px 20px",
                      }}
                    >
                      <h5 className="card-title" style={{ color: "white" }}>
                        {name}
                      </h5>
                      <p className="card-text" style={{ color: "white" }}>
                        Address: {fromTo}
                      </p>
                      <div style={{ display: "block", float: "right" }}>
                        <i
                          className="fa fa-trash-o"
                          style={{ font: "150px", color: "white" }}
                          onClick={null}
                        ></i>
                      </div>
                      <p className="card-text" style={{ color: "white" }}>
                        Available Timing:
                      </p>
                      <div style={{ display: "block", float: "right" }}>
                        <i
                          className="fa fa-edit"
                          style={{ font: "150px", color: "white" }}
                          onClick={null}
                        ></i>
                      </div>

                      <p className="card-text" style={{ color: "white" }}>
                        Price: Rs {fair} per head
                      </p>
                    </div>
                  </div>
                  <center>
                    <Button
                      variant="contained"
                      id="addButton"
                      color="secondary"
                      onClick={() => deleteVeh()}
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
                    </Button>
                  </center>
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
                        style={{ backgroundColor: "#570000" }}
                      >
                        Submit
                      </Button>
                    </center>
                  </form>
                </div>
              </div>
            </div>
          </Paper>
        </React.Fragment>
      )}
    </>
  );
};

export default UpdateVehicle;
