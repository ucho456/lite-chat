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
  isLeave: boolean;
  limitAt: Timestamp;
};

const useRoom = () => {
  const roomConverter: FirestoreDataConverter<Room> = {
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
        limitAt: d.limitAt,
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
