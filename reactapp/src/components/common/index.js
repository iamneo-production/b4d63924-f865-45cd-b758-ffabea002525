import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RailContext } from "../context/context";
import Loading from "./Loading";

export default function Index() {
  const navigate = useNavigate();
  const { setUser } = useContext(RailContext);
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    console.log(user);
    if (user) {
      setTimeout(() => {
        console.log(user.userType);
        setUser(user);
        user.userType.toLowerCase() === "admin"
          ? navigate("/admin/dashboard")
          : navigate("/user/dashboard");
      }, 2000);
    } else navigate("/login");
  }, []);

  return <Loading />;
}
