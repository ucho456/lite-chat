type Sex = "man" | "woman";

type WaitingState = "waiting" | "matched";

type User = {
  uid: string;
  name: string;
  photo: string | null;
  sex: Sex;
  youSex: Sex;
  waitingState: WaitingState;
  waitingStartAt: Date;
  roomId: string | null;
};

type InitialUserState = {
  user: User | null;
};

type InputUser = {
  name: string;
  photo: string | null;
  sex: Sex;
  youSex: Sex;
};
