import { createSlice } from "@reduxjs/toolkit";
import { action } from "./action";

interface userState {
  singleUserData: null | [];
  loading: boolean;
  isError: boolean;
}

const initialState: userState = {
  singleUserData: null,
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
      .addCase(action.rejected, (state) => {
        state.loading = false;
        state.isError = true;
      });
  },
});

export default singleUserSlice.reducer;
