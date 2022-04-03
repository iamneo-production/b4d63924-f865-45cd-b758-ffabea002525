import * as React from "react";
import Navbar from "./Navbar";
import "../../index.css";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { addVehicle } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddVehicle() {
  const paperstyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [timing, setTiming] = useState("");
  const [fromTo, setfromTo] = useState("");
  const [imageURL, setImageUrl] = useState("");
  const [fair, setFair] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");

  let [nameError, setNameError] = useState(false);
  let [timingError, setTimingError] = useState(false);
  let [fromToError, setFromToError] = useState(false);
  let [imageUrlError, setImageUrlError] = useState(false);
  let [fairError, setFairError] = useState(false);
  let [capacityError, setCapacityError] = useState(false);
  let [descriptionError, setDescriptionError] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    if (name === "") setNameError(true);

    if (timing === "") setTimingError(true);

    if (fromTo === "") setFromToError(true);

    if (imageURL === "") setImageUrlError(true);

    if (fair === "") setFairError(true);

    if (capacity === "") setCapacityError(true);

    if (description === "") setDescriptionError(true);

    setNameError("false");
    setTimingError("false");
    setFromToError("false");
    setImageUrlError("false");
    setFairError("false");
    setCapacityError("false");
    setDescriptionError("false");

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
    console.log(response);
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
      <Navbar />
      <Container>
        <ToastContainer />
        <Paper elevation={7} style={paperstyle}>
          <center>
            <h3>Add Vehicle</h3>
          </center>
          <form className="needs-validation" noValidate autoComplete="off">
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
              {" "}
              <Button
                variant="contained"
                id="addButton"
                color="secondary"
                onClick={handleClick}
                style={{ backgroundColor: "#570000" }}
              >
                Add
              </Button>
            </center>
          </form>
        </Paper>
      </Container>
    </>
  );
}
