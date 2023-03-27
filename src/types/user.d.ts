type User = {
  name: string;
  photo: string | null;
  sex: "man" | "woman";
  waitingState: "waiting" | "matched";
  waitingStartAt?: import("firebase/firestore").Timestamp;
  roomId: string | null;
};

type InitialUserState = {
  user: User | null;
};

type InputUser = {
  name: User.name;
  photo: User.photo;
  sex: User.sex;
};
