import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import UserVehicle from "../components/user_components/Vehicle";
import AddBooking from "../components/user_components/AddBooking";
import AdminDashboard from "../components/admin_components/Dashboard";
import UserDashboard from "../components/user_components/Dashboard";
import AddVehicle from "../components/admin_components/AddVehicle";
import EditVehicle from "../components/admin_components/EditVehicle";
import ProtectedRoutes from "./ProtectedRoute";
import Error from "../components/Error";
import Logout from "../components/Logout";
import Home from "../components";

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
        <Route path="editvehicle" element={<EditVehicle />} />
      </Route>
      <Route path="/user" element={<ProtectedRoutes path="user" />}>
        <Route index path="dashboard" element={<UserDashboard />} />
        <Route path="vehicles" element={<UserVehicle />} />
        <Route path="booking" element={<AddBooking />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Navigation;
