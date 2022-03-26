import authLogin from "./Auth";
import { GET, POST, DELETE } from "./index";

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
