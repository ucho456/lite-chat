import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(u: User): DocumentData {
    return {
      name: u.name,
      photo: u.photo,
      sex: u.sex,
      youSex: u.youSex,
      waitingState: u.waitingState,
      waitingStartAt: u.waitingStartAt,
      roomId: u.roomId,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const d = snapshot.data();
    return {
      name: d.name,
      photo: d.photo,
      sex: d.sex,
      youSex: d.youSex,
      waitingState: d.waitingState,
      waitingStartAt: d.waitingStartAt,
      roomId: d.roomId,
    };
  },
};
