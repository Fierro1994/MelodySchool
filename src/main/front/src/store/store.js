import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/auth/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;