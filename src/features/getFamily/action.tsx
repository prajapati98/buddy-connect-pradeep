import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetFamilyMembers } from "../../network/user";

export const action = createAsyncThunk(
  "familyList/familyList",
  async (id: number | undefined, thunkAPI) => {
    try {
      const response = await GetFamilyMembers(id);
      return response.data.response;
    } catch (error) {
      throw error;
    }
  }
);
