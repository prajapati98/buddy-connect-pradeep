import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDeletedDetails } from "../../network/user";

export const action = createAsyncThunk(
  "DeletedList/DeletedList",
  async (thunkAPI) => {
    try {
      const response = await getDeletedDetails();
      return response.data.response;
    } catch (error) {
      throw error;
    }
  }
);
