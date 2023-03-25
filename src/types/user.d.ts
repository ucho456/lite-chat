type User = {
  uid: string;
  name: string;
  photo: string;
};

type InitialUserState = {
  user: null | User;
};
