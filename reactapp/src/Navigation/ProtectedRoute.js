import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RailContext } from "../components/context/context";

const useAuth = (path) => {
  const { user } = useContext(RailContext);
  if (path === null || path === undefined) return false;
  if (user && !user.loggedIn) {
    const loggedIn = JSON.parse(window.localStorage.getItem("user"));
    if (loggedIn?.userType.toLowerCase() === path) return true;
    else return false;
  }
  if (user?.userType.toLowerCase() === path) return true;
  else return false;
};

const ProtectedRoutes = (props) => {
  const path = props?.path;
  const isAuth = useAuth(path);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
