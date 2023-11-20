export const apiPrefix = "";

export const USER_ENDPOINT = {
  USER_INFO: `${apiPrefix}/login.php`,
  REGISTER_USER: `${apiPrefix}/register.php`,
  USER_LIST: `${apiPrefix}/user/users.php`,
  IMAGE_UPLOAD: `${apiPrefix}/user/userImageUpload.php`,
  DELETE_USER: `${apiPrefix}/user/deleteUser.php`,
  GET_SINGLE_USER: `${apiPrefix}/user/getPersonalDetail.php`,

  //FETCH_ALL_HISTORY: `${apiPrefix}/history.php`,
  // AUTH_CONFIRM_PHONE: `${apiPrefix}/Auth/ConfirmPhone`,
  // USER_INFO: `${apiPrefix}/Auth/UserInfo`,
  // VEHICLE_TYPES: `${apiPrefix}/Lib/VehicleTypes`,
  // UPDATE_PHONE: `${apiPrefix}/Auth/ChangePhone`,
  // CANCEL_ORDER: `${apiPrefix}/Orders/Cancel`,
};
