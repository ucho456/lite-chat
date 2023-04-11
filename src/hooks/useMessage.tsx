import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import useFirestore from "./useFirestore";
import { useAppSelector } from "../store/hooks";
import useSubCollection from "./useSubCollection";

export type Message = {
  id: string;
  uid: string;
  text: string;
  createdAt: Timestamp;
};

const useMessage = () => {
  const { addDoc, getSubColRef } = useFirestore();

  const authUid = useAppSelector((state) => state.auth.uid);

  const messageConverter: FirestoreDataConverter<Message> = {
    toFirestore(m: Message): DocumentData {
      return {
        uid: m.uid,
        text: m.text,
        createdAt: m.createdAt,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Message {
      const d = snapshot.data();
      return {
        id: snapshot.id,
        uid: d.uid,
        text: d.text,
        createdAt: d.createdAt,
      };
    },
  };

  const parentCollectionName = "rooms";
  const collectionName = "messages";

  const addMessageDoc = async (roomId: string, inputText: string) => {
    if (!authUid) return;
    const colRef = getSubColRef(
      parentCollectionName,
      roomId,
      collectionName,
      messageConverter
    );
    await addDoc(colRef, {
      id: colRef.id,
      uid: authUid,
      text: inputText,
      createdAt: serverTimestamp(),
    });
  };

  const getReactiveMessageCol = (roomId: string) => {
    const { subCollection: messages } = useSubCollection<Message>(
      parentCollectionName,
      roomId,
      collectionName,
      messageConverter,
      [orderBy("createdAt", "asc")]
    );
    return messages;
  };

  return { addMessageDoc, getReactiveMessageCol };
};

export default useMessage;
