import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialAuthState = {
  uid: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.uid = action.payload;
    },
    signOut: (state) => {
      state.uid = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
