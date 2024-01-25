import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setOnlineTime } from "../components/auth/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/getItemsMenu/fulfilled',],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['auth.listMenuItems'],
      },
    }),
});

export default store;