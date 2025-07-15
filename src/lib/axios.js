import axios from "axios";

 const axiosInstance = axios.create({
  // baseURL: import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "/api",
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // or your actual key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export {axiosInstance}