import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "../../network/user";

interface User {
  username: string;
}

interface LoginState {
  user: User | null;
  loading: boolean;
  isError: boolean;
}

const initialState: LoginState = {
  user: null,
  loading: false,
  isError: false,
};

export const login = createAsyncThunk(
  "login/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      console.log(credentials);
      const response = await userInfo(credentials);

      if (response.status !== 200) {
        throw new Error("Failed to login");
      }
      const data = await response.data;
      localStorage.setItem("user", JSON.stringify(data.response));
      return data.data;
    } catch (error) {
      throw new Error("Failed to login");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isError = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.isError = true;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
