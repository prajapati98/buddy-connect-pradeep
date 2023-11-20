import { postRequest, getRequest, deleteRequest } from "./ApiRequest";
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
export const GET_SINGLE_USER = (id: Number) => {
  return getRequest(`${USER_ENDPOINT.GET_SINGLE_USER}?id=${id}`);
};

export const userInfo = (payload: any) => {
  return postRequest(USER_ENDPOINT.USER_INFO, payload);
};

export const REGISTER_USER = (payload: any) => {
  return postRequest(USER_ENDPOINT.REGISTER_USER, payload);
};
export const IMAGE_UPLOAD = (payload: any) => {
  return postRequest(USER_ENDPOINT.IMAGE_UPLOAD, payload);
};
export const DELETE_USER = (id: string) => {
  return deleteRequest(`${USER_ENDPOINT.DELETE_USER}?user_id=${id}`);
};

// export const getVehicleTypes = () => {
//   return getRequest(USER_ENDPOINT.VEHICLE_TYPES);
// };

// export const updatePhone = (payload) => {
//   return postRequest(`${USER_ENDPOINT.UPDATE_PHONE}?phone=${payload.phone}`);
// };

// export const cancelOrder = (payload) => {
//   return putRequest(USER_ENDPOINT.CANCEL_ORDER, payload);
// };
