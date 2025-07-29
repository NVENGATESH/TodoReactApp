// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://nishanthtodoapp.onrender.com/api/auth",
  withCredentials: true, // send cookies with requests
});

export const registerUser = (data) => api.post("/signup", data);
export const loginUser = (data) => api.post("/signin", data);
export const logoutUser = () => api.post("/signout");
export const getCurrentUser = () => api.get("/currentuser");

export default api;
