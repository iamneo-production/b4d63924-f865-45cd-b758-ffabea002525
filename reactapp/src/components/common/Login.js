import React, { useState, useEffect, useContext } from "react";
import { RailContext } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/api";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginSignup.css";

const Login = () => {
  const { user, setUser } = useContext(RailContext);
  const [loginemail, setLoginEmail] = useState("");
  const [loginpassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const obj = {
      email: loginemail,
      password: loginpassword,
    };
    const response = await loginApi(obj);
    console.log(response);

    if (response) {
      const token = response.headers.authorization.replace("Bearer ", "");

      const user = {
        userType: response.data.userRole,
        email: response.data.email,
        firstName: response.data.name,
        lastName: "",
        mobilenumber: response.data.mobileNumber,
        age: "",
        gender: "",
        loggedIn: true,
        token: token,
      };

      await setUser(user);
      window.localStorage.removeItem("user");
      window.localStorage.setItem("user", JSON.stringify(user));

      toast("SignUp success!", {
        type: "success",
        theme: "dark",
      });

      if (response.data.userRole.toLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } else {
      toast("Invalid Username or Password", {
        type: "error",
        theme: "colored",
        // position: "bottom-center",
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="main">
          <ToastContainer />
          <section className="sign-in">
            <div className="containerLogin">
              <div className="signin-content">
                <div
                  className="signin-image"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 35,
                  }}
                >
                  <figure>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                      className="img-fluid"
                      alt="Sample"
                    />
                  </figure>
                  <Link
                    to="/signup"
                    className="signup-image-link"
                    style={{ paddingTop: "3rem" }}
                    id="signupLink"
                  >
                    Create an account
                  </Link>
                </div>
                <div className="signin-form">
                  <h2 className="form-title">Sign In</h2>
                  <form
                    method="POST"
                    className="register-form"
                    id="login-form"
                    onSubmit={(e) => handleLogin(e)}
                  >
                    <div className="form-group">
                      <label>
                        <i className="zmdi zmdi-account material-icons-name"></i>
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        <i className="zmdi zmdi-lock"></i>
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group form-button">
                      <input
                        type="submit"
                        name="loginButton"
                        id="loginButton"
                        className="form-submit"
                        value="Log in"
                      />
                    </div>
                  </form>
                  <div className="social-login">
                    <span className="social-label">Or login with</span>
                    <ul className="socials">
                      <li>
                        <a href="#">
                          <i className="display-flex-center zmdi zmdi-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="display-flex-center zmdi zmdi-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="display-flex-center zmdi zmdi-google"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Login;
