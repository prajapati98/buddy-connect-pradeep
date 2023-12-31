import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFamilyMembers } from "../../network/user";

export const action = createAsyncThunk(
  "familyList/familyList",
  async (id: number | undefined, thunkAPI) => {
    try {
      const response = await getFamilyMembers(id);
      return response.data.response;
    } catch (error) {
      throw error;
    }
  }
);
