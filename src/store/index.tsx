import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/login/loginSlice";
import addNewUserSlice from "../features/user/addNewUserSlice";
import userListSlice from "../features/userList/userListSlice";
import singleUserSlice from "../features/ singleUser /singleUserSlice";
import familyListSlice from "../features/getFamily/familyListSlice";
import BankListSlice from "../features/getBankDetails/BankListSlice";
import SalaryListSlice from "../features/getSalary/SalaryListSlice";
import DeletedListSlice from "../features/getDeletedList/DeletedListSlice";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    user: addNewUserSlice,
    userList: userListSlice,
    singleUserData: singleUserSlice,
    FamilyList: familyListSlice,
    BankList: BankListSlice,
    SalaryList: SalaryListSlice,
    DeletedList: DeletedListSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
