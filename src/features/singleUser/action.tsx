import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleUser } from "../../network/user";

export const action = createAsyncThunk(
  "useList/useList",
  async (id: number, thunkAPI) => {
    try {
      const response = await getSingleUser(id);
      return response.data.response;
    } catch (error) {
      throw error;
    }
  }
);
