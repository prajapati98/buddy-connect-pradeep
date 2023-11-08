import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://buddy-connect.encoreskydev.com/api",
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

// axiosClient.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     if (config.data instanceof FormData) {
//       config.headers["Content-Type"] = config.data.getHeaders();
//     } else {
//       config.headers["Content-Type"] = "application/json";
//     }
//     return config;
//   },
//   (error: AxiosError) => {
//     console.log("error", error);
//     return Promise.reject(error);
//   },
//   { synchronous: true }
// );

// axiosClient.interceptors.response.use(
//   (response: AxiosResponse) => {
//     console.log("response", response);
//     if (response && response.data && response.data.type === "application/pdf") {
//       return response.data;
//     } else if (response.data) {
//       return { ...response.data };
//     } else if (response.status === 200) {
//       return response.status;
//     }
//     return Promise.reject(response.data);
//   },
//   (error: AxiosError) => {
//     console.log("error-r", error);

//     switch (error?.response?.status) {
//       case 400:
//         return Promise.reject(error.response.status);
//       case 401:
//         return Promise.reject(error.response.status);
//       case 403:
//         unauthorizeAccess(error.response.status);
//         return Promise.reject(error.response.status);
//       case 404:
//         return Promise.reject(error.response.status);
//       case 405:
//         return Promise.reject(error.response.status);
//       case 501:
//         return Promise.reject(error.response.status);
//       case 422:
//         return Promise.reject(error.response.data);
//       default:
//         return Promise.reject(error);
//     }
//   }
// );

// const unauthorizeAccess = (status: number | undefined) => {
//   console.log("unauthorizeAccess");
// };
