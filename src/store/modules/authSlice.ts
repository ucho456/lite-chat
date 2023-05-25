import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  uid: string | null;
  checked: boolean;
};

const initialState: AuthState = {
  uid: null,
  checked: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isFirstAuthChecked: (state, action: PayloadAction<AuthState>) => {
      state.uid = action.payload.uid;
      state.checked = action.payload.checked;
    },
    signIn: (state, action: PayloadAction<AuthState["uid"]>) => {
      state.uid = action.payload;
    },
    signOut: (state) => {
      state.uid = null;
    },
  },
});

export const { isFirstAuthChecked, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
