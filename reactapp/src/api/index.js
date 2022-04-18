import axios from "axios";

// export const baseUrl = "http://localhost:8080/";
export const baseUrl =
  "https://8080-dbdaadcadeaccdabccccfbacdbbfafefecadaccc.examlyiopb.examly.io/";

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
    const response = await axios.post(baseUrl + path, payload, {
      headers: getHeaders(),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const PUT = async (path, payload) => {
  try {
    const response = await axios.put(baseUrl + path, payload, {
      headers: getHeaders(),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const DELETE = async (path) => {
  try {
    const response = await axios.delete(baseUrl + path, {
      headers: getHeaders(),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};
