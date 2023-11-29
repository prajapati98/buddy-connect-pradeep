import { axiosClient } from "./ApiClient";

export const getRequest = (url: string) => {
  return axiosClient.get(url);
};

export const postRequest = (url: string, payload: string) => {
  return axiosClient.post(url, payload);
};

export const putRequest = (url: string, payload: string) => {
  return axiosClient.put(url, payload);
};

export const deleteRequest = (url: string) => {
  return axiosClient.delete(url);
};

export const patchRequest = (url: string, payload: string) => {
  return axiosClient.patch(url, { status: payload });
};

export const patchRequestActiveAccount = (url: string) => {
  return axiosClient.patch(url);
};
