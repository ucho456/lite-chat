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
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const d = snapshot.data();
    return {
      uid: snapshot.id,
      name: d.name,
      photo: d.photo,
    };
  },
};
