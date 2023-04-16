import {
  DocumentData,
  FieldValue,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

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

const converter: FirestoreDataConverter<Room> = {
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

const useRoom = () => {
  /** Get reactive rooms collection. pagenation function. */
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomCount, setRoomCount] = useState(0);
  const [isMax, setIsMax] = useState(false);
  const [page, setPage] = useState(1);
  const authUid = useAppSelector((state) => state.auth.uid);
  useEffect(() => {
    const colRef = collection(db, "rooms").withConverter(converter);
    const q = query(
      colRef,
      where("isBlock", "==", false),
      where("userUids", "array-contains", authUid),
      orderBy("lastActionAt", "desc"),
      limit(page)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _rooms: Room[] = [];
      querySnapshot.forEach((doc) => _rooms.push(doc.data()));
      setRooms(_rooms);
      setIsMax(_rooms.length === roomCount && roomCount !== 0);
      setRoomCount(_rooms.length);
    });
    return () => unsubscribe();
  }, [page]);
  const addPage = 1;
  const getRoomsNextPage = (): void => setPage((pre) => pre + addPage);

  /** Get reactive room document */
  const [room, setRoom] = useState<Room | null>(null);
  const { roomId } = useParams<{ roomId: string }>();
  useEffect(() => {
    if (!roomId) return;
    const docRef = doc(db, "rooms", roomId).withConverter(converter);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) setRoom(doc.data());
    });
    return () => unsubscribe();
  }, [roomId]);

  const addRoomDoc = async (me: RoomUser, you: RoomUser): Promise<void> => {
    const colRef = collection(db, "rooms").withConverter(converter);
    await addDoc(colRef, {
      id: colRef.id,
      inviteeUser: me,
      invitedUser: you,
      userUids: [me.uid, you.uid],
      isBlock: false,
      lastMessage: "",
      lastActionAt: serverTimestamp(),
    });
  };

  return {
    addRoomDoc,
    getRoomsNextPage,
    isMax,
    room,
    rooms,
  };
};

export default useRoom;
