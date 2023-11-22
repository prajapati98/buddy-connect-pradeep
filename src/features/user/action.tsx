import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "../../network/user";

export const action = createAsyncThunk(
  "user/user",
  async (credentials: {}, thunkAPI) => {
    try {
      const response = await registerUser(credentials);
      return response.data.success;
    } catch (error) {
      throw error;
    }
  }
);
