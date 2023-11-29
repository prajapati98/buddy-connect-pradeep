export const apiPrefix = "";

export const USER_ENDPOINT = {
  USER_INFO: `${apiPrefix}/login.php`,
  REGISTER_USER: `${apiPrefix}/register.php`,
  USER_LIST: `${apiPrefix}/user/users.php`,
  IMAGE_UPLOAD: `${apiPrefix}/user/userImageUpload.php`,
  DELETE_USER: `${apiPrefix}/user/deleteUser.php`,
  GET_SINGLE_USER: `${apiPrefix}/user/getPersonalDetail.php`,
  UPDATE_SINGLE_USER: `${apiPrefix}/user/updatePersonalDetail.php`,
  UPDATE_USER_STATUS: `${apiPrefix}/user/userStatus.php`,
  ADD_FAMILY_MEMBER: `${apiPrefix}/family/addFamilyDetail.php`,
  GET_FAMILY_MEMBERS: `${apiPrefix}/family/getFamilyDetails.php`,
  DELETE_FAMILY_MEMBER: `${apiPrefix}/family/deleteFamilyDetail.php`,
  ADD_BANK_DETAILS: `${apiPrefix}/bank/addBankDetail.php`,
  GET_BANK_DETAILS: `${apiPrefix}/bank/getBankDetails.php`,
  DELETE_BANK_DETAILS: `${apiPrefix}/bank/deleteBankDetail.php`,
  SET_ACTIVE_ACCOUNT: `${apiPrefix}/bank/setAccountType.php`,
};
