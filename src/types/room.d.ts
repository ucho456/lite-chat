type RoomUser = {
  uid: string;
  name: string;
  photo: string | null;
  unread: boolean;
};

type Room = {
  id: string;
  inviteeUser: RoomUser;
  invitedUser: RoomUser;
  userUids: string[];
  isBlock: boolean;
  lastMessage: string;
  lastActionAt?: Timestamp | FieldValue;
};
