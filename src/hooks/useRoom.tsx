import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import useDocument from "./useDocument";

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
  lastMessageAt: Timestamp;
};

const useRoom = () => {
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
        lastMessageAt: d.lastMessageAt,
      };
    },
  };

  const collectionName = "rooms";

  const getReactiveRoomDoc = (roomId: string): Room | null => {
    const { document: room } = useDocument<Room>(
      collectionName,
      roomId,
      roomConverter
    );
    return room;
  };

  return { getReactiveRoomDoc };
};

export default useRoom;
