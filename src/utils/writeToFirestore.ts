import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import {
  messageConverter,
  roomConverter,
  userConverter,
} from "@/utils/converters";
import { db } from "@/firebase";

export const createUser = async (user: User): Promise<void> => {
  const docRef = doc(db, "users", user.uid).withConverter(userConverter);
  await setDoc(docRef, {
    ...user,
    lastActionAt: serverTimestamp(),
  });
};

export const updateUser = async (user: User): Promise<void> => {
  const docRef = doc(db, "users", user.uid).withConverter(userConverter);
  await updateDoc(docRef, {
    ...user,
    lastActionAt: serverTimestamp(),
  });
};

export const createRoom = async (me: User, you: User): Promise<void> => {
  const batch = writeBatch(db);

  const roomColRef = collection(db, "rooms").withConverter(roomConverter);
  const roomId = doc(roomColRef).id;
  const roomDocRef = doc(db, "rooms", roomId).withConverter(roomConverter);
  batch.set(roomDocRef, {
    id: roomId,
    inviteeUser: {
      uid: me.uid,
      name: me.name,
      photo: me.photo,
      unread: false,
    },
    invitedUser: {
      uid: you.uid,
      name: you.name,
      photo: you.photo,
      unread: false,
    },
    userUids: [me.uid, you.uid],
    isBlock: false,
    lastMessage: "",
    lastActionAt: serverTimestamp(),
  });

  const userDocRef = doc(db, "users", me.uid).withConverter(userConverter);
  batch.update(userDocRef, {
    ...me,
    life: me.life - 1,
    lastActionAt: serverTimestamp(),
  });

  await batch.commit();
};

export const createMessage = async (
  roomId: string,
  authUid: string,
  inputText: string,
  room: Room,
) => {
  const batch = writeBatch(db);

  const messageColRef = collection(
    db,
    "rooms",
    roomId,
    "messages",
  ).withConverter(messageConverter);
  const messageId = doc(messageColRef).id;
  const messageDocRef = doc(
    db,
    "rooms",
    roomId,
    "messages",
    messageId,
  ).withConverter(messageConverter);
  batch.set(messageDocRef, {
    id: messageId,
    uid: authUid,
    text: inputText,
    createdAt: serverTimestamp(),
  });

  const roomDocRef = doc(db, "rooms", roomId).withConverter(roomConverter);
  const updateRoomUser =
    room.inviteeUser.uid === authUid
      ? { ["invitedUser.unread"]: true }
      : { ["inviteeUser.unread"]: true };
  batch.update(roomDocRef, {
    ...updateRoomUser,
    ["lastMessage"]: inputText,
    ["lastActionAt"]: serverTimestamp(),
  });

  await batch.commit();
};
