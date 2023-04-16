import {
  CollectionReference,
  DocumentData,
  FieldValue,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  limit,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import useDocument from "./useDocument";
import useFirestore from "./useFirestore";
import useCollection from "./useCollection";
import { useState } from "react";

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
  userUids: string[];
  isBlock: boolean;
  lastMessage: string;
  lastActionAt?: Timestamp | FieldValue;
};

const useRoom = () => {
  const { addDoc, getColRef } = useFirestore();

  const roomConverter: FirestoreDataConverter<Room> = {
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

  const collectionName = "rooms";

  const getRoomColRef = (): CollectionReference<Room> => {
    return getColRef(collectionName, roomConverter);
  };

  const getReactiveRoomCol = (
    authUid: string | null,
    limitNum: number
  ): Room[] => {
    if (!authUid) return [];
    const { collection: rooms } = useCollection(
      collectionName,
      roomConverter,
      [
        where("userUids", "array-contains", authUid),
        orderBy("lastActionAt", "desc"),
        limit(limitNum),
      ],
      limitNum
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

  const addRoomDoc = async (me: RoomUser, you: RoomUser): Promise<void> => {
    const roomColRef = getRoomColRef();
    await addDoc(roomColRef, {
      id: roomColRef.id,
      inviteeUser: me,
      invitedUser: you,
      userUids: [me.uid, you.uid],
      isBlock: false,
      lastMessage: "",
      lastActionAt: serverTimestamp(),
    });
  };

  return { addRoomDoc, getReactiveRoomCol, getReactiveRoomDoc };
};

export default useRoom;
