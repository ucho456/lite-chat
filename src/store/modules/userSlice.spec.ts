import {
  userSlice,
  setUser,
  resetUser,
  UserState,
} from "@/store/modules/userSlice";

describe("userSlice", () => {
  it("should handle setUser action", () => {
    const initialState = {
      user: null,
    };
    const mockUser: User = {
      uid: "user1",
      name: "John Doe",
      photo: null,
      sex: "man",
      era: "over 18",
      selfIntroduction: "Hello, I'm John Doe.",
      roomCount: 2,
      blocks: [],
    };
    const action = setUser(mockUser);
    const newState = userSlice.reducer(initialState, action);
    expect(newState.user).toEqual(mockUser);
  });
  it("should handle resetUser action", () => {
    const initialState: UserState = {
      user: {
        uid: "user1",
        name: "John Doe",
        photo: null,
        sex: "man",
        era: "over 18",
        selfIntroduction: "Hello, I'm John Doe.",
        roomCount: 2,
        blocks: [],
      },
    };
    const action = resetUser();
    const newState = userSlice.reducer(initialState, action);
    expect(newState.user).toBeNull();
  });
});
