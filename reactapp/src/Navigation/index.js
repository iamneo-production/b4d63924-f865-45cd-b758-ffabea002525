import { Route, Routes } from "react-router-dom";
import Login from "../components/common/Login";
import Signup from "../components/common/Signup";
import UserVehicle from "../components/user_components/Vehicle";
import MyBooking from "../components/user_components/MyBookings";
import AdminDashboard from "../components/admin_components/Dashboard";
import UserDashboard from "../components/user_components/Dashboard";
import AddVehicle from "../components/admin_components/AddVehicle";
import EditVehicle from "../components/admin_components/EditVehicle";
import ProtectedRoutes from "./ProtectedRoute";
import Error from "../components/common/Error";
import Logout from "../components/common/Logout";
import Home from "../components/common";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/admin" element={<ProtectedRoutes path="admin" />}>
        <Route index path="dashboard" element={<AdminDashboard />} />
        <Route path="addvehicle" element={<AddVehicle />} />
        <Route path="editvehicle/:id" element={<EditVehicle />} />
      </Route>
      <Route path="/user" element={<ProtectedRoutes path="user" />}>
        <Route index path="dashboard" element={<UserDashboard />} />
        <Route path="vehicles/:id" element={<UserVehicle />} />
        <Route path="booking" element={<MyBooking />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Navigation;
