import axios from "axios";

export const instance = axios.create({
  baseURL: `http://localhost:5000/`,
  headers: {
    token: localStorage.getItem("token") || "",
  },
});

export const SERVER_URL = "http://localhost:5000/";
