import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RailContext } from "../components/context/context";

const useAuth = () => {
  const { user } = useContext(RailContext);
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
