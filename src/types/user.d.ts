type Sex = "man" | "woman";

type WaitingState = "waiting" | "matched";

type User = {
  name: string;
  photo: string | null;
  sex: Sex;
  youSex: Sex;
  waitingState: WaitingState;
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
  youSex: User.youSex;
};
