import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialAuthState = {
  uid: string | null;
};

const initialState: InitialAuthState = {
  uid: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<InitialAuthState["uid"]>) => {
      state.uid = action.payload;
    },
    signOut: (state) => {
      state.uid = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
