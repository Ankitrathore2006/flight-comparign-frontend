import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://flight-comparign-backend.onrender.com/api/",
  withCredentials: true,
});
