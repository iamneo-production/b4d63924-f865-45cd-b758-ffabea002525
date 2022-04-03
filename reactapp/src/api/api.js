import authLogin from "./Auth";
import { GET, POST, DELETE, PUT } from "./index";

const authApiCall = async (path, payload) => {
  try {
    const response = await authLogin.post(path, payload);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const loginApi = async (payload) => {
  const response = await authApiCall("/login", payload);
  return response;
};

export const signupApi = async (payload) => {
  const response = await authApiCall("/signup", payload);
  return response;
};

export const getAllVehicles = async (userType) => {
  const response = await GET(`${userType}/dashboard`);
  return response;
};

export const createBooking = async (id, payload) => {
  const response = await POST(`user/booking/${id}`, payload);
  return response;
};

export const getMyBookings = async () => {
  const response = await GET("user/booking");
  return response;
};

export const deleteBooking = async (id) => {
  const response = await DELETE(`user/deleteBooking/${id}`);
  return response;
};

export const editBooking = async (id, payload) => {
  const response = await PUT(`user/editBooking/${id}`, payload);
  return response;
};

export const addVehicle = async (payload) => {
  const response = await POST("admin/addVehicle", payload);
  return response;
};

export const deleteVehicle = async (id) => {
  const response = await DELETE(`admin/deleteVehicle/${id}`);
  return response;
};

export const editVehicle = async (id, payload) => {
  const response = await PUT(`admin/editVehicle/${id}`, payload);
  return response;
};

export const getVehicleById = async (userType, id) => {
  const response = await GET(`${userType}/getVehicle/${id}`);
  return response;
};
