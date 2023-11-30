import {
  postRequest,
  getRequest,
  deleteRequest,
  putRequest,
  patchRequest,
  patchRequestActiveAccount,
} from "./ApiRequest";
import { USER_ENDPOINT } from "./EndPoints";

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
export const UploadImage = (payload: any, id: number) => {
  return postRequest(`${USER_ENDPOINT.IMAGE_UPLOAD}?id=${id}`, payload);
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
export const AddFamilyMember = (payload: any, id: number) => {
  return postRequest(
    `${USER_ENDPOINT.ADD_FAMILY_MEMBER}?user_id=${id}`,
    payload
  );
};
export const getFamilyMembers = (id: number | undefined) => {
  return getRequest(`${USER_ENDPOINT.GET_FAMILY_MEMBERS}?user_id=${id}`);
};
export const deleteFamilyMembers = (
  id: number | undefined,
  family_id: number | undefined
) => {
  return deleteRequest(
    `${USER_ENDPOINT.DELETE_FAMILY_MEMBER}?user_id=${id}&family_id=${family_id}`
  );
};
export const addBankDetails = (payload: any, id: number) => {
  return postRequest(
    `${USER_ENDPOINT.ADD_BANK_DETAILS}?user_id=${id}`,
    payload
  );
};

export const getBankDetails = (id: number | undefined) => {
  return getRequest(`${USER_ENDPOINT.GET_BANK_DETAILS}?user_id=${id}`);
};

export const deleteBankDetails = (
  id: number | undefined,
  bank_id: number | undefined
) => {
  return deleteRequest(
    `${USER_ENDPOINT.DELETE_BANK_DETAILS}?user_id=${id}&bank_id=${bank_id}`
  );
};

export const setActiveAccount = (
  id: number | undefined,
  bank_id: number | undefined
) => {
  return patchRequestActiveAccount(
    `${USER_ENDPOINT.SET_ACTIVE_ACCOUNT}?user_id=${id}&bank_id=${bank_id}`
  );
};

export const addSalaryDetails = (payload: any, id: number) => {
  return postRequest(
    `${USER_ENDPOINT.ADD_SALARY_DETAILS}?user_id=${id}`,
    payload
  );
};
export const getSalaryDetails = (id: number | undefined) => {
  return getRequest(`${USER_ENDPOINT.GET_SALARY_DETAILS}?user_id=${id}`);
};
