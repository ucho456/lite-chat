import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  uid: string | null;
};

const initialState: AuthState = {
  uid: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthState["uid"]>) => {
      state.uid = action.payload;
    },
    signOut: (state) => {
      state.uid = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
