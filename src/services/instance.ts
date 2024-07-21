import axios from "axios";

const ACCESS_TOKEN = localStorage.getItem("access_token");

const instance = axios.create({
  baseURL: "/api/v1/",
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
});

export default instance;
