import React, { useState, useEffect, useContext } from "react";
import { RailContext } from "./context/context";
import { signupApi } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [usertype, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { signup, signupHandle } = useContext(RailContext);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const clearTexts = () => {
    console.log("Clear");
    setUserType("");
    setEmail("");
    setUsername("");
    setMobileNumber("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const obj = {
      email: email,
      password: password,
      name: userName,
      mobileNumber: mobileNumber,
      userRole: usertype,
    };
    const response = await signupApi(obj);
    console.log(response);
    if (!response) {
      toast("SignUp failed!", {
        type: "error",
        theme: "colored",
        position: "bottom-center",
      });
      clearTexts();
      return;
    }

    if (response.data === "Admin added" || response.data === "User added") {
      toast("SignUp success!", {
        type: "success",
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      console.log(response.data);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ height: "30rem" }}
        >
          <ToastContainer />
          <div className="card " style={{ width: "28rem" }}>
            <h5 className="card-header nav-bg text-white">Register</h5>
            <div className="card-body">
              <form>
                <div className="mb-2">
                  <input
                    id="admin/user"
                    value={usertype}
                    name="userType"
                    onChange={(e) => setUserType(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Enter admin/user"
                    aria-label="default input example"
                  />
                </div>
                <div className="mb-2">
                  <input
                    id="email"
                    name="userSignupemail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    type="email"
                    placeholder="Enter email"
                    aria-label="default input example"
                  />
                </div>
                <div className="mb-2">
                  <input
                    id="username"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Enter Username"
                    aria-label="default input example"
                  />
                </div>
                <div className="mb-2">
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Enter Mobilenumber"
                    aria-label="default input example"
                  />
                </div>
                <div className="mb-2">
                  <input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    type="password"
                    placeholder="Enter Password"
                    aria-label="default input example"
                  />
                </div>
                <div className="mb-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    value={signup.confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                    type="password"
                    placeholder="Confirm Password"
                    aria-label="default input example"
                  />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <button
                    type="submit"
                    id="submitButton"
                    className="btn nav-bg text-white d-block m-2"
                    onClick={(e) => handleSignup(e)}
                  >
                    Submit
                  </button>
                  <span id="signinLink">
                    <p className="text-muted me-1 d-inline-block">
                      Already a user?
                    </p>
                    <Link to="/login">Login</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
