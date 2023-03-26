type User = {
  uid: string;
  name: string;
  photo: string;
  sex: "man" | "woman";
};

type InitialUserState = {
  user: User | null;
};

type InputUser = {
  name: User.name;
  photo: User.photo;
  sex: User.sex;
};
