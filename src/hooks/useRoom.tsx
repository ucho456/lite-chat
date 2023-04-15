import {
  DocumentData,
  FieldValue,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import useDocument from "./useDocument";
import useFirestore from "./useFirestore";
import useCollection from "./useCollection";

export type RoomUser = {
  uid: string;
  name: string;
  photo: string | null;
  unread: boolean;
};

export type Room = {
  id: string;
  inviteeUser: RoomUser;
  invitedUser: RoomUser;
  isBlock: boolean;
  lastMessage: string;
  lastMessageAt?: Timestamp | FieldValue;
};

const useRoom = () => {
  const { addDoc, getColRef } = useFirestore();

  const roomConverter: FirestoreDataConverter<Room> = {
    toFirestore(r: Room): DocumentData {
      return {
        inviteeUser: r.inviteeUser,
        invitedUser: r.invitedUser,
        isBlock: r.isBlock,
        lastMessage: r.lastMessage,
        lastMessageAt: r.lastMessageAt,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Room {
      const d = snapshot.data();
      return {
        id: snapshot.id,
        inviteeUser: d.inviteeUser,
        invitedUser: d.invitedUser,
        isBlock: d.isBlock,
        lastMessage: d.lastMessage,
      };
    },
  };

  const collectionName = "rooms";

  const getRoomColRef = () => {
    return getColRef(collectionName, roomConverter);
  };

  const getReactiveRoomCol = () => {
    const { collection: rooms } = useCollection(
      collectionName,
      roomConverter,
      [] //Todo: 条件をいれる
    );
    return rooms;
  };

  const getReactiveRoomDoc = (roomId: string): Room | null => {
    const { document: room } = useDocument<Room>(
      collectionName,
      roomId,
      roomConverter
    );
    return room;
  };

  const addRoomDoc = async (me: RoomUser, you: RoomUser) => {
    const roomColRef = getRoomColRef();
    await addDoc(roomColRef, {
      id: roomColRef.id,
      inviteeUser: me,
      invitedUser: you,
      isBlock: false,
      lastMessage: "",
      lastMessageAt: serverTimestamp(),
    });
  };

  return { addRoomDoc, getReactiveRoomCol, getReactiveRoomDoc };
};

export default useRoom;
