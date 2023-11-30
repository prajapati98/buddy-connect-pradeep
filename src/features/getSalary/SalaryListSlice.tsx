import { createSlice } from "@reduxjs/toolkit";
import { action } from "./action";

interface userState {
  SalaryList: string | null | [];
  loading: boolean;
  isError: boolean;
  errorMessage: null | string;
}

const initialState: userState = {
  SalaryList: null,
  errorMessage: null,
  loading: false,
  isError: false,
};
const SalaryListSlice = createSlice({
  name: "SalaryList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(action.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(action.fulfilled, (state, action) => {
        state.SalaryList = action.payload;
        state.loading = false;
        state.isError = false;
      })
      .addCase(action.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.errorMessage =
          action.error.message || "Failed to get salary details";
      });
  },
});

export default SalaryListSlice.reducer;
