import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBankDetails } from "../../network/user";

export const action = createAsyncThunk(
  "bankList/bankList",
  async (id: number | undefined, thunkAPI) => {
    try {
      const response = await getBankDetails(id);
      return response.data.response;
    } catch (error) {
      throw error;
    }
  }
);
