import axios from "axios";

export const baseUrl = "http://localhost:8080/";

const getToken = () => {
  let token = JSON.parse(window.localStorage.getItem("user"))?.token;
  return token;
};

const getHeaders = () => {
  let headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  return headers;
};

export const GET = async (path) => {
  try {
    const response = await axios.get(baseUrl + path, {
      headers: getHeaders(),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const POST = async (path, payload) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/${path}`,
      payload,
      {
        headers: getHeaders(),
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const PUT = async (path, payload) => {
  try {
    const response = await axios.put(`http://localhost:8080/${path}`, payload, {
      headers: getHeaders(),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const DELETE = async (path) => {
  try {
    const response = await axios.delete(`http://localhost:8080/${path}`, {
      headers: getHeaders(),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};
