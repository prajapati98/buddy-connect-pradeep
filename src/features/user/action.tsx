import { createAsyncThunk } from "@reduxjs/toolkit";
import { REGISTER_USER } from "../../network/user";

export const action = createAsyncThunk(
  "user/user",
  async (credentials: {}, thunkAPI) => {
    try {
      const response = await REGISTER_USER(credentials);
      return response.data.response;
    } catch (error) {
      throw new Error("Failed to user insert");
    }
  }
);
