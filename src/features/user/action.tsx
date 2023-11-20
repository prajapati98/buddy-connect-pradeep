import {createAsyncThunk } from "@reduxjs/toolkit";
import { REISTER_USER } from "../../network/user";


export const action = createAsyncThunk(
    "user/user",
    async (credentials:{}, thunkAPI) => {
      try {
        const response = await REISTER_USER(credentials);
        return response.data.response;
      } catch (error) {
        throw new Error("Failed to user insert");
      }
    }
  );