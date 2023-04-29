type Sex = "man" | "woman";

type Era =
  | "under 10"
  | "early teens"
  | "late teens"
  | "early 20s"
  | "late 20s"
  | "early 30s"
  | "late 30s"
  | "early 40s"
  | "late 40s"
  | "early 50s"
  | "late 50s"
  | "early 60s"
  | "late 60s"
  | "over 70s";

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
