import React, { useState } from "react";
import Navigation from "../Navigation";

export default function Home() {
  const [selectUser, setSelectUser] = useState(null);
  const handleAdminLogin = () => {
    console.log("AdminLogin");
    setSelectUser("Admin");
  };

  const handleUserLogin = () => {
    console.log("UserLogin");
    setSelectUser("User");
  };

  return (
    <>
      {!selectUser && (
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ height: "30rem" }}
        >
          <button
            type="button"
            id="loginButton"
            className="btn nav-bg text-white  m-1"
            onClick={handleAdminLogin}
          >
            Admin
          </button>
          <button
            type="button"
            id="loginButton"
            className="btn nav-bg text-white  m-1"
            onClick={handleUserLogin}
          >
            User
          </button>
        </div>
      )}
      {selectUser && selectUser === "Admin" && (
        <Navigation currentUser="Admin" />
      )}
      {selectUser && selectUser === "User" && <Navigation currentUser="User" />}
    </>
  );
}
