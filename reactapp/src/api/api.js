import axiosApi from "./index";
import authLogin from "./Auth";

const authApiCall = async (path, payload) => {
  try {
    const response = await authLogin.post(path, payload);
    return response;
  } catch (e) {
    console.log(e);
  }
};

const POST = async (path, payload) => {
  try {
    const response = await axiosApi.post(path, payload);
    return response;
  } catch (e) {
    console.log(e);
  }
};

const GET = async (path) => {
  try {
    const response = await axiosApi.get(path);
    return response;
  } catch (e) {
    console.log(e);
  }
};

const DELETE = async (path) => {
  try {
    const response = await axiosApi.delete(path);
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
