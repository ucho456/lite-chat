type RoomUser = {
  uid: string;
  name: string;
  photo: string | null;
};

type Room = {
  id: string;
  users: {
    A: RoomUser;
    B: RoomUser;
  };
  isLeave: boolean;
  limitAt: Date;
};

// このあとやること
// RoomとMessageを直接指定してまずは取得しちゃう。
