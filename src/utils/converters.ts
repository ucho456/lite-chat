import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

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
    };
  },
};

export const roomConverter: FirestoreDataConverter<Room> = {
  toFirestore(r: Room): DocumentData {
    return {
      inviteeUser: r.inviteeUser,
      invitedUser: r.invitedUser,
      userUids: r.userUids,
      isBlock: r.isBlock,
      lastMessage: r.lastMessage,
      lastActionAt: r.lastActionAt,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Room {
    const d = snapshot.data();
    return {
      id: snapshot.id,
      inviteeUser: d.inviteeUser,
      invitedUser: d.invitedUser,
      userUids: d.userUids,
      isBlock: d.isBlock,
      lastMessage: d.lastMessage,
    };
  },
};

export const signalConverter: FirestoreDataConverter<Signal> = {
  toFirestore(s: Signal): DocumentData {
    return {
      type: s.type,
      sender: s.sender,
      sessionDescription: s.sessionDescription,
      candidate: s.candidate,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Signal {
    const d = snapshot.data();
    return {
      type: d.type,
      sender: d.sender,
      sessionDescription: d.sessionDescription,
      candidate: d.candidate,
    };
  },
};

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(u: User): DocumentData {
    return {
      name: u.name,
      photo: u.photo,
      sex: u.sex,
      life: u.life,
      lastActionAt: u.lastActionAt,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const d = snapshot.data();
    return {
      uid: snapshot.id,
      name: d.name,
      photo: d.photo,
      sex: d.sex,
      life: d.life,
    };
  },
};
