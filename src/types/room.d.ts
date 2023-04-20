type RoomUser = {
  uid: string;
  name: string;
  photo: string | null;
  sex: Sex;
  era: Era;
  selfIntroduction: string;
  unread: boolean;
};

type Room = {
  id: string;
  inviteeUser: RoomUser;
  invitedUser: RoomUser;
  userUids: string[];
  isBlock: boolean;
  lastMessage: string;
  lastActionAt?: import("firebase/firestore").Timestamp;
};
