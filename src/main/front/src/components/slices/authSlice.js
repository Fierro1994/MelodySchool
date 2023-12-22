import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authService from "../services/authService";

const initialState = {
  isAuthenticated: false,
  user: null,
  registered: false,
  isError: false,
  loading: false,
  isSuccess: false,
  message: "",
};


export const register = createAsyncThunk(
  "users/register",
  async ({ username, email, password, roles }, thunkAPI) => {
    const userData = JSON.stringify({
      email,
      username,
      password,
      roles,
    });
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const login = createAsyncThunk(
  "users/login",
  async ({ username, password }, thunkAPI) => {
    const userData = JSON.stringify({
      username,
      password,
    });

    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("users/logout", (_, thunkAPI) => {
  try {
    authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const tokenRefresh = createAsyncThunk(
  "tokenRefresh",
  async (token, { rejectWithValue }) => {
      try {
          
          const response = await axios.post("/refresh", {
              token: token
          })
          console.log(token)
          console.log(response.data)
          return await response.data;
      } catch (error) {
          if (!error.response) {
              throw error;
          }
          return rejectWithValue(error.response.data.error);
      }
  }
);

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
        state.registered = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const { resetRegistered } = authSlice.actions;
export default authSlice.reducer;