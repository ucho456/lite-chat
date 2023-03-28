type Room = {
  id: string;
  users: {
    [key: string]: {
      uid: string;
      name: string;
      photo: string | null;
    };
  };
  isLeave: boolean;
  limitAt: Date;
};

// このあとやること
// RoomとMessageを直接指定してまずは取得しちゃう。
