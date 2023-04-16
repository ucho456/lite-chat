import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { roomConverter, userConverter } from "./converters";

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

export const setUserDoc = async (user: User): Promise<void> => {
  const docRef = doc(db, "users", user.uid).withConverter(userConverter);
  await setDoc(docRef, {
    ...user,
    lastActionAt: serverTimestamp(),
  });
};
