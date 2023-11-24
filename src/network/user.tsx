import {
  postRequest,
  getRequest,
  deleteRequest,
  putRequest,
  patchRequest,
} from "./ApiRequest";
import { USER_ENDPOINT } from "./EndPoints";

// export const fetchAllProducts = () => {
//   return getRequest(USER_ENDPOINT.FETCH_ALL_PROFUCT);
// };

// export const fetchAllHistory = () => {
//   return getRequest(USER_ENDPOINT.FETCH_ALL_HISTORY);
// };
// export const authConfirmPhone = (payload) => {
//   return postRequest(USER_ENDPOINT.AUTH_CONFIRM_PHONE + `?code=${payload}`);
// };

export const getUserList = () => {
  return getRequest(USER_ENDPOINT.USER_LIST);
};
export const getSingleUser = (id: Number) => {
  return getRequest(`${USER_ENDPOINT.GET_SINGLE_USER}?id=${id}`);
};

export const userInfo = (payload: any) => {
  return postRequest(USER_ENDPOINT.USER_INFO, payload);
};
export const registerUser = (payload: any) => {
  return postRequest(USER_ENDPOINT.REGISTER_USER, payload);
};
export const IMAGE_UPLOAD = (payload: any) => {
  return postRequest(USER_ENDPOINT.IMAGE_UPLOAD, payload);
};
export const deleteUser = (id: string) => {
  return deleteRequest(`${USER_ENDPOINT.DELETE_USER}?user_id=${id}`);
};

export const updatePersonalDetail = (payload: any, id: number) => {
  return putRequest(`${USER_ENDPOINT.UPDATE_SINGLE_USER}?id=${id}`, payload);
};
export const updateUserStatus = (payload: any, id: string) => {
  return patchRequest(
    `${USER_ENDPOINT.UPDATE_USER_STATUS}?user_id=${id}`,
    payload
  );
};
// export const getVehicleTypes = () => {
//   return getRequest(USER_ENDPOINT.VEHICLE_TYPES);
// };

// export const updatePhone = (payload) => {
//   return postRequest(`${USER_ENDPOINT.UPDATE_PHONE}?phone=${payload.phone}`);
// };
