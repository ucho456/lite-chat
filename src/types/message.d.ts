type Message = {
  id: string;
  uid: string;
  text: string;
  createdAt: import("firebase/firestore").Timestamp;
};
