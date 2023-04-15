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
};

export type Room = {
  id: string;
  users: {
    A: RoomUser;
    B: RoomUser;
  };
  isBlock: boolean;
  lastMessage: string;
  lastMessageAt?: Timestamp | FieldValue;
};

const useRoom = () => {
  const { addDoc, getColRef } = useFirestore();

  const roomConverter: FirestoreDataConverter<Room> = {
    toFirestore(r: Room): DocumentData {
      return {
        users: r.users,
        isBlock: r.isBlock,
        lastMessage: r.lastMessage,
        lastMessageAt: r.lastMessageAt,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Room {
      const d = snapshot.data();
      return {
        id: snapshot.id,
        users: d.users,
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
      users: {
        A: me,
        B: you,
      },
      isBlock: false,
      lastMessage: "",
      lastMessageAt: serverTimestamp(),
    });
  };

  return { addRoomDoc, getReactiveRoomCol, getReactiveRoomDoc };
};

export default useRoom;
