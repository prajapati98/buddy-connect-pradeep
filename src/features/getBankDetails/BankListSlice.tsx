import { createSlice } from "@reduxjs/toolkit";
import { action } from "./action";

interface userState {
  BankList: string | null | [];
  loading: boolean;
  isError: boolean;
  errorMessage: null | string;
}

const initialState: userState = {
  BankList: null,
  errorMessage: null,
  loading: false,
  isError: false,
};
const BankListSlice = createSlice({
  name: "BankList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(action.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(action.fulfilled, (state, action) => {
        state.BankList = action.payload;
        state.loading = false;
        state.isError = false;
      })
      .addCase(action.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.errorMessage =
          action.error.message || "Failed to get Family Members";
      });
  },
});

export default BankListSlice.reducer;
