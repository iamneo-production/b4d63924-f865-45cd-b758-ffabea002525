import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Vehicle from "../components/user_components/Vehicle";
import AdminDashboard from "../components/admin_components/Dashboard";
import UserDashboard from "../components/user_components/Dashboard";
import AddVehicle from "../components/admin_components/AddVehicle";
import EditVehicle from "../components/admin_components/EditVehicle";
import ProtectedRoutes from "./ProtectedRoute";
import Error from "../components/Error";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<ProtectedRoutes />}>
        <Route index path="dashboard" element={<AdminDashboard />} />
        <Route path="addvehicle" element={<AddVehicle />} />
        <Route path="editvehicle" element={<EditVehicle />} />
      </Route>
      <Route path="/user" element={<ProtectedRoutes />}>
        <Route index path="dashboard" element={<UserDashboard />} />
        <Route path="vehicles" element={<Vehicle />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Navigation;
