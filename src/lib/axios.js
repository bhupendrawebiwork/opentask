import { baseUrl } from "@/config/constent";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "/api",
  baseURL: baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or your actual key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["ngrok-skip-browser-warning"] = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
