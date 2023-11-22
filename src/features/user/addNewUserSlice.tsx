import { createSlice } from "@reduxjs/toolkit";
import { action } from "./action";
interface User {
  username: string;
}

interface userState {
  user: User | null;
  loading: boolean;
  isError: boolean;
  errorMessage: null | string;
}

const initialState: userState = {
  user: null,
  errorMessage: null,
  loading: false,
  isError: false,
};

const addNewUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(action.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(action.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isError = false;
      })
      .addCase(action.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.errorMessage = action.error.message || "Failed to insert user";
      });
  },
});

export default addNewUserSlice.reducer;
