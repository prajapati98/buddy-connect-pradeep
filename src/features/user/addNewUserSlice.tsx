import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { action } from "./action";
interface User {
  username: string;
}

interface userState {
  user: User | null;
  loading: boolean;
  isError: boolean;
}

const initialState: userState = {
  user: null,
  loading: false,
  isError: false,
};



const addNewUserSlice = createSlice({
  name: "user",
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
        state.user = action.payload;
        state.loading = false;
        state.isError = false;
      })
      .addCase(action.rejected, (state) => {
        state.loading = false;
        state.isError = true;
      });
  },
});

export default addNewUserSlice.reducer;
