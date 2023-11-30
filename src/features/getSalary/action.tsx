import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSalaryDetails } from "../../network/user";

export const action = createAsyncThunk(
  "SalaryList/SalaryList",
  async (id: number | undefined, thunkAPI) => {
    try {
      const response = await getSalaryDetails(id);
      return response.data.response;
    } catch (error) {
      throw error;
    }
  }
);
