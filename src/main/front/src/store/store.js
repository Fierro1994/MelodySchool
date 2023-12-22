import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/slices/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;