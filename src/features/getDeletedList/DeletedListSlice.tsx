import { createSlice } from "@reduxjs/toolkit";
import { action } from "./action";

interface deletedState {
  DeletedList: string | null | [];
  loading: boolean;
  isError: boolean;
  errorMessage: null | string;
}

const initialState: deletedState = {
  DeletedList: null,
  errorMessage: null,
  loading: false,
  isError: false,
};
const DeletedListSlice = createSlice({
  name: "DeletedList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(action.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(action.fulfilled, (state, action) => {
        state.DeletedList = action.payload;
        state.loading = false;
        state.isError = false;
      })
      .addCase(action.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.errorMessage =
          action.error.message || "Failed to get deleted list";
      });
  },
});

export default DeletedListSlice.reducer;
