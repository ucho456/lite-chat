import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { roomConverter } from "./converters";

export const addRoomDoc = async (
  me: RoomUser,
  you: RoomUser
): Promise<void> => {
  const colRef = collection(db, "rooms").withConverter(roomConverter);
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
