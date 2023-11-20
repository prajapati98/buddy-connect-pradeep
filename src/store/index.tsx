import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/login/loginSlice";
import addNewUserSlice from "../features/user/addNewUserSlice";
import userListSlice from "../features/userList/userListSlice";
import singleUserSlice from "../features/ singleUser /singleUserSlice";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    user: addNewUserSlice,
    userList: userListSlice,
    singleUserData: singleUserSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
