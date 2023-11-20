import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_SINGLE_USER } from "../../network/user";

export const action = createAsyncThunk(
  "useList/useList",
  async (id: number, thunkAPI) => {
    try {
      const response = await GET_SINGLE_USER(id);

      return response.data.response;
    } catch (error) {
      throw new Error("Failed to use list");
    }
  }
);
