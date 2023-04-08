import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<InitialUserState["user"]>) => {
      state.user = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;

// Todo: userSliceわざわざ必要ない気がするのでしかるべき時に削除する。
