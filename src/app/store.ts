import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
