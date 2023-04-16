import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

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
