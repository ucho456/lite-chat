type Sex = "man" | "woman";

type Era =
  | "under 10"
  | "early teens"
  | "late teens"
  | "early 20's"
  | "late 20's"
  | "early 30's"
  | "late 30's"
  | "early 40's"
  | "late 40's"
  | "early 50's"
  | "late 50's"
  | "early 60's"
  | "late 60's"
  | "over 70's";

type User = {
  uid: string;
  name: string;
  photo: string | null;
  sex: Sex;
  era: Era;
  selfIntroduction: string;
  life: number;
  roomCount: number;
  blocks: string[];
  lastActionAt?: import("firebase/firestore").Timestamp;
};

type InputUser = {
  name: string;
  photo: string | null;
  sex: Sex;
  era: Era;
  selfIntroduction: string;
};

type Condition = {
  sex: Sex;
  era: Era;
};
