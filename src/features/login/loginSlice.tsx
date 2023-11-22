import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "../../network/user";
interface User {
  username: string;
}

interface LoginState {
  user: User | null;
  loading: boolean;
  isError: boolean;
  errorMessage: null | string;
}

const initialState: LoginState = {
  user: null,
  errorMessage: null,
  loading: false,
  isError: false,
};

export const login = createAsyncThunk(
  "login/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await userInfo(credentials);
      localStorage.setItem("user", JSON.stringify(response.data.response));
      window.location.reload();
      return response.data.response;
    } catch (error) {
      throw error;
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
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.errorMessage = action.error.message || "Failed to login";
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
