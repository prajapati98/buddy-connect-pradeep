import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { action } from "./action";
interface UserList {
  username: string;
}

interface userState {
  userList: UserList | null;
  loading: boolean;
  isError: boolean;
}

const initialState: userState = {
  userList: null,
  loading: false,
  isError: false,
};
const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(action.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(action.fulfilled, (state, action) => {
        state.userList = action.payload;
        state.loading = false;
        state.isError = false;
      })
      .addCase(action.rejected, (state) => {
        state.loading = false;
        state.isError = true;
      });
  },
});

export default userListSlice.reducer;
