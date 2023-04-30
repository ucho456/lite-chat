type Message = {
  id: string;
  uid: string;
  text: string;
  createdAt: import("firebase-admin/firestore").Timestamp;
};
