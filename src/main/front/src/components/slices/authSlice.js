import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authService from "../services/authService";

const initialState = {
  isAuthenticated: false,
  accessToken: localStorage.getItem("access"),
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
          return await response.data;
      } catch (error) {
          if (!error.response) {
              throw error;
          }
          return rejectWithValue(error.response.data.error);
      }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserRed: (state, action) => {
      state.accessToken = action.payload.body.accessToken;
    },
    logoutUserRed: (state) => {
      state.accessToken = undefined;

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
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isSuccess = true;
        state.accessToken = action.payload.body.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
        state.accessToken = "";
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

export const {loginUserRed, logoutUserRed } = authSlice.actions;
export default authSlice.reducer;