import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../hooks/useUser";

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export const { resetUser, setUser } = userSlice.actions;
export default userSlice.reducer;
