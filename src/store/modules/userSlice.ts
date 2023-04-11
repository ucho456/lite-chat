import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { User } from "../../hooks/useUser";
import { RootState } from "../store";
import useUser from "../../hooks/useUser";

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
  authUid: string;
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const { getUserDoc } = useUser();
    try {
      const user = await getUserDoc(payload.authUid);
      dispatch(setUser(user));
    } catch (error: any) {
      alert(error.message);
    }
  };
};

export { resetUser, setUser, setUserAsync };
export default userSlice.reducer;
