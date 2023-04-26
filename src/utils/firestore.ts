import {
  arrayUnion,
  collection,
  doc,
  increment,
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
      sex: me.sex,
      era: me.era,
      selfIntroduction: me.selfIntroduction,
      unread: false,
    },
    invitedUser: {
      uid: you.uid,
      name: you.name,
      photo: you.photo,
      sex: you.sex,
      era: you.era,
      selfIntroduction: you.selfIntroduction,
      unread: false,
    },
    userUids: [me.uid, you.uid],
    isBlock: false,
    lastMessage: "",
    lastActionAt: serverTimestamp(),
  });

  const meDocRef = doc(db, "users", me.uid).withConverter(userConverter);
  batch.update(meDocRef, {
    ...me,
    life: increment(-1),
    roomCount: increment(1),
    lastActionAt: serverTimestamp(),
  });

  const youDocRef = doc(db, "users", you.uid).withConverter(userConverter);
  batch.update(youDocRef, { roomCount: increment(1) });

  await batch.commit();
};

export const createMessage = async (
  roomId: string,
  user: User,
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
    uid: user.uid,
    text: inputText,
    createdAt: serverTimestamp(),
  });

  const roomDocRef = doc(db, "rooms", roomId).withConverter(roomConverter);
  const updateRoomUser =
    room.inviteeUser.uid === user.uid
      ? {
          ["invitedUser.unread"]: true,
          ["inviteeUser.name"]: user.name,
          ["inviteeUser.photo"]: user.photo,
          ["inviteeUser.sex"]: user.sex,
          ["inviteeUser.era"]: user.era,
          ["inviteeUser.selfIntroduction"]: user.selfIntroduction,
        }
      : {
          ["inviteeUser.unread"]: true,
          ["invitedUser.name"]: user.name,
          ["invitedUser.photo"]: user.photo,
          ["invitedUser.sex"]: user.sex,
          ["invitedUser.era"]: user.era,
          ["invitedUser.selfIntroduction"]: user.selfIntroduction,
        };
  batch.update(roomDocRef, {
    ...updateRoomUser,
    lastMessage:
      inputText.length <= 17 ? inputText : inputText.substring(0, 17) + "...",
    lastActionAt: serverTimestamp(),
  });

  await batch.commit();
};

export const readMessage = async (me: RoomUser, room: Room) => {
  const updateRoom =
    room.inviteeUser.uid === me.uid
      ? { "inviteeUser.unread": false }
      : { "invitedUser.unread": false };
  const roomDocRef = doc(db, "rooms", room.id).withConverter(roomConverter);
  await updateDoc(roomDocRef, updateRoom);
};

export const blockRoom = async (
  roomId: string,
  meUid: string,
  youUid: string,
) => {
  const batch = writeBatch(db);

  const roomDocRef = doc(db, "rooms", roomId).withConverter(roomConverter);
  batch.update(roomDocRef, { isBlock: true });

  const userDocRef = doc(db, "users", meUid).withConverter(userConverter);
  batch.update(userDocRef, { blocks: arrayUnion(youUid) });

  await batch.commit();
};
