import { axiosClient } from "./ApiClient";

// export const getRequest = (url) => {
//   return axiosClient.get(url);
// };

export const postRequest = (url: string, payload: string) => {
  return axiosClient.post(url, payload);
};

// export const putRequest = (url, payload) => {
//   return axiosClient.put(url, payload);
// };

// export const deleteRequest = (url, payload) => {
//   return axiosClient.delete(url, payload);
// };

// export const patchRequest = (url, payload) => {
//   return axiosClient.patch(url, payload);
// };

// export const patchDownloadRequest = (url, payload) => {
//   return axiosClient.patch(url, payload, {
//     responseType: "blob",
//   });
// };
