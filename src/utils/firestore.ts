import {
  DocumentReference,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import {
  answerCandidateConverter,
  callConverter,
  messageConverter,
  offerCandidateConverter,
  roomConverter,
  userConverter,
} from "@/utils/converters";
import { db } from "@/firebase";

export const createUser = async (user: User): Promise<void> => {
  const docRef = doc(db, "users", user.uid).withConverter(userConverter);
  await setDoc(docRef, {
    uid: user.uid,
    name: user.name,
    photo: user.photo,
    sex: user.sex,
    era: user.era,
    selfIntroduction: user.selfIntroduction,
    roomCount: user.roomCount,
    blocks: user.blocks,
    lastActionAt: serverTimestamp(),
  });
};

export const updateUser = async (user: User): Promise<void> => {
  const docRef = doc(db, "users", user.uid).withConverter(userConverter);
  await updateDoc(docRef, {
    name: user.name,
    photo: user.photo,
    sex: user.sex,
    era: user.era,
    selfIntroduction: user.selfIntroduction,
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

export const getCandidateDocRefs = (
  roomId: string,
): {
  offerCandidateDocRef: DocumentReference<OfferCandidate>;
  answerCandidateDocRef: DocumentReference<AnswerCandidate>;
} => {
  return {
    offerCandidateDocRef: doc(
      db,
      "rooms",
      roomId,
      "offerCandidates",
      roomId,
    ).withConverter(offerCandidateConverter),
    answerCandidateDocRef: doc(
      db,
      "rooms",
      roomId,
      "answerCandidates",
      roomId,
    ).withConverter(answerCandidateConverter),
  };
};

export const deletePhoneDocs = async (
  roomId: string,
  callId: string,
): Promise<void> => {
  const { offerCandidateDocRef, answerCandidateDocRef } =
    getCandidateDocRefs(roomId);
  const callDocRef = doc(db, "rooms", roomId, "calls", callId).withConverter(
    callConverter,
  );
  const batch = writeBatch(db);
  batch.delete(callDocRef);
  batch.delete(offerCandidateDocRef);
  batch.delete(answerCandidateDocRef);
  await batch.commit();
};

export const createOfferCandidate = (
  roomId: string,
  offerCandidate: RTCIceCandidateInit,
): void => {
  const { offerCandidateDocRef } = getCandidateDocRefs(roomId);
  setDoc(offerCandidateDocRef, offerCandidate);
};

export const getCallColRef = (roomId: string) => {
  return collection(db, "rooms", roomId, "calls").withConverter(callConverter);
};

export const createCall = async (
  roomId: string,
  offer: Offer,
): Promise<void> => {
  const callColRef = getCallColRef(roomId);
  await addDoc(callColRef, { offer, answer: null });
};

export const createAnswerCandidate = (
  roomId: string,
  answerCandidate: RTCIceCandidateInit,
): void => {
  const { answerCandidateDocRef } = getCandidateDocRefs(roomId);
  setDoc(answerCandidateDocRef, answerCandidate);
};

export const fetchCall = async (
  roomId: string,
  callId: string,
): Promise<Call | null> => {
  const callDocRef = doc(db, "rooms", roomId, "calls", callId).withConverter(
    callConverter,
  );
  const snapshot = await getDoc(callDocRef);
  return snapshot.exists() ? snapshot.data() : null;
};

export const updateCall = async (
  roomId: string,
  callId: string,
  answer: Answer,
): Promise<void> => {
  const callDocRef = doc(db, "rooms", roomId, "calls", callId).withConverter(
    callConverter,
  );
  await updateDoc(callDocRef, { answer });
};
