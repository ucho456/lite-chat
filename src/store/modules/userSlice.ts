import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import useUser, { User } from "../../hooks/useUser";
import { RootState } from "../store";

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

const { resetUser, setUser } = userSlice.actions;

const setUserAsync = (payload: {
  user: User;
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const { setUserDoc } = useUser();
    await setUserDoc(payload.user);
    dispatch(setUser(payload.user));
  };
};

export { resetUser, setUser, setUserAsync };
export default userSlice.reducer;
