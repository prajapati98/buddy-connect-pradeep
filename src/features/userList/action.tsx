import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserList } from "../../network/user";

export const action = createAsyncThunk("useList/useList", async (thunkAPI) => {
  try {
    const response = await getUserList();
    return response.data.response;
  } catch (error) {
    throw error;
  }
});
