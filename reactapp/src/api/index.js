import axios from "axios";

const getToken = () => {
  const token = JSON.parse(window.localStorage.getItem("user")).token;
  console.log(token);
  return token;
};

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
