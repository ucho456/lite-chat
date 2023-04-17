import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/modules/authSlice";
import roomsReducer from "@/store/modules/roomsSlice";
import userReducer from "@/store/modules/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
