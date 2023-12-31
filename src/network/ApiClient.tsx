import axios from "axios";
import { LogOut } from "../utils/LogOut";
import { useNavigate } from "react-router-dom";

export const axiosClient = axios.create({
  baseURL: "https://f335-122-175-198-182.ngrok-free.app",
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const hasAccessToken = user.token;

    // Set the 'Authorization' header with the access token
    config.headers.Authorization = `Bearer ${hasAccessToken}`;

    // console.log("config.data instanceof", config.data instanceof FormData);
    if (config.data instanceof FormData) {
      // Set the 'Content-Type' header for FormData explicitly
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      // Set the 'Content-Type' header for JSON data
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    // console.error("Request error", error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    console.log("response", response);
    if (response && response.data && response.data.type === "application/pdf") {
      return response.data;
    } else if (response.status === 200) {
      return response.data;
    }
    return Promise.reject(response.data);
  },
  (error) => {
    console.error("Response error", error);

    switch (error?.response?.status) {
      case 400:
        return Promise.reject(error.response?.data);
      case 401:
        const navigate = useNavigate();

        localStorage.removeItem("user");
        navigate("/login");
        // unauthorizeAccess(error.response);
        return Promise.reject(error.response?.data);
      case 403:
        return Promise.reject(error.response?.data);

      case 404:
        return Promise.reject(error.response?.data);

      case 405:
        return Promise.reject(error.response?.data);
      case 501:
        return Promise.reject(error.response?.data);
      case 422:
        return Promise.reject(error.response?.data);
      default:
        return Promise.reject(error);
    }
  }
);

// const unauthorizeAccess = (error: any) => {};
