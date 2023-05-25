import { rooms, setRooms } from "@/store/modules/roomsSlice";

describe("roomsSlice", () => {
  it("should handle setRooms action", () => {
    const initialState = {
      rooms: [],
    };
    const mockRooms: Room[] = [
      {
        id: "1",
        inviteeUser: {
          uid: "user1",
          name: "User 1",
          photo: null,
          sex: "man",
          era: "over 18",
          selfIntroduction: "Hello, I'm User 1.",
          unread: false,
        },
        invitedUser: {
          uid: "user2",
          name: "User 2",
          photo: null,
          sex: "woman",
          era: "over 18",
          selfIntroduction: "Nice to meet you. I'm User 2.",
          unread: true,
        },
        userUids: ["user1", "user2"],
        isBlock: false,
        lastMessage: "Hello!",
      },
      {
        id: "2",
        inviteeUser: {
          uid: "user3",
          name: "User 3",
          photo: null,
          sex: "man",
          era: "over 18",
          selfIntroduction: "Hi, I'm User 3.",
          unread: true,
        },
        invitedUser: {
          uid: "user4",
          name: "User 4",
          photo: null,
          sex: "woman",
          era: "over 18",
          selfIntroduction: "Nice to meet you. I'm User 4.",
          unread: false,
        },
        userUids: ["user3", "user4"],
        isBlock: false,
        lastMessage: "Hey there!",
      },
    ];
    const action = setRooms(mockRooms);
    const newState = rooms.reducer(initialState, action);
    expect(newState.rooms).toEqual(mockRooms);
  });
});
