import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Removing local data");
    window.localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, []);

  return <Loading />;
};

export default Logout;
