type Sex = "man" | "woman";

type User = {
  uid: string;
  name: string;
  photo: string | null;
  sex: Sex;
  life: number;
  lastActionAt?: Timestamp | FieldValue;
};

type InputUser = {
  name: string;
  photo: string | null;
  sex: Sex;
};

type Condition = {
  sex: Sex;
};
