import { createSlice } from "@reduxjs/toolkit";
import { action } from "./action";

interface userState {
  singleUserData: [];
  errorMessage: null | string;
  loading: boolean;
  isError: boolean;
}

const initialState: userState = {
  errorMessage: null,
  singleUserData: [],
  loading: false,
  isError: false,
};
const singleUserSlice = createSlice({
  name: "singleUserData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(action.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(action.fulfilled, (state, action) => {
        state.singleUserData = action.payload;
        state.loading = false;
        state.isError = false;
      })
      .addCase(action.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.errorMessage =
          action.error.message || "Failed to get single user";
      });
  },
});

export default singleUserSlice.reducer;
