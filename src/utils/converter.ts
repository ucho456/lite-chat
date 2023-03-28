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
      uid: snapshot.id,
      name: d.name,
      photo: d.photo,
      sex: d.sex,
      youSex: d.youSex,
      waitingState: d.waitingState,
      waitingStartAt: d.waitingStartAt.toDate(),
      roomId: d.roomId,
    };
  },
};

export const roomConverter: FirestoreDataConverter<Room> = {
  toFirestore(r: Room): DocumentData {
    return {
      users: r.users,
      isLeave: r.isLeave,
      limitAt: r.limitAt,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Room {
    const d = snapshot.data();
    return {
      id: snapshot.id,
      users: d.users,
      isLeave: d.isLeave,
      limitAt: d.limitAt.toDate(),
    };
  },
};

export const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore(m: Message): DocumentData {
    return {
      uid: m.uid,
      text: m.text,
      createdAt: m.createdAt,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Message {
    const d = snapshot.data();
    return {
      id: snapshot.id,
      uid: d.uid,
      text: d.text,
      createdAt: d.createdAt.toDate(),
    };
  },
};
