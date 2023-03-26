type User = {
  uid: string;
  name: string;
  photo: string;
};

type InitialUserState = {
  user: User | null;
};

type InputUser = {
  name: User.name;
  photo: User.photo;
};
