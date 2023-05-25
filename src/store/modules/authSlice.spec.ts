import { authSlice, AuthState } from "@/store/modules/authSlice";

describe("authSlice", () => {
  it("should handle isFirstAuthChecked action", () => {
    const initialState: AuthState = {
      uid: null,
      checked: false,
    };
    const authPayload: AuthState = {
      uid: "exampleUid",
      checked: true,
    };
    const action = authSlice.actions.isFirstAuthChecked(authPayload);
    const newState = authSlice.reducer(initialState, action);
    expect(newState.uid).toEqual(authPayload.uid);
    expect(newState.checked).toEqual(authPayload.checked);
  });
  it("should handle signIn action", () => {
    const initialState: AuthState = {
      uid: null,
      checked: false,
    };
    const uid = "exampleUid";
    const action = authSlice.actions.signIn(uid);
    const newState = authSlice.reducer(initialState, action);
    expect(newState.uid).toEqual(uid);
  });
  it("should handle signOut action", () => {
    const initialState: AuthState = {
      uid: "exampleUid",
      checked: true,
    };
    const action = authSlice.actions.signOut();
    const newState = authSlice.reducer(initialState, action);
    expect(newState.uid).toBeNull();
  });
});
