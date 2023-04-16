import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/authSlice";
import roomsReducer from "./modules/roomsSlice";
import userReducer from "./modules/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
