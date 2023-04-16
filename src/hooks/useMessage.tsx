import {
  DocumentData,
  FieldValue,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

export type Message = {
  id: string;
  uid: string;
  text: string;
  createdAt?: Timestamp | FieldValue;
};

const converter: FirestoreDataConverter<Message> = {
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
    };
  },
};

const useMessage = () => {
  /** Get reactive messages collection. */
  const [messages, setMessages] = useState<Message[]>([]);
  const { roomId } = useParams<{ roomId: string }>();
  useEffect(() => {
    if (!roomId) return;
    const colRef = collection(db, "rooms", roomId, "messages").withConverter(
      converter
    );
    const q = query(colRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _messages: Message[] = [];
      querySnapshot.forEach((doc) => _messages.push(doc.data()));
      setMessages(_messages);
    });
    return () => unsubscribe();
  }, [roomId]);

  const authUid = useAppSelector((state) => state.auth.uid);
  const addMessageDoc = async (inputText: string): Promise<void> => {
    if (!authUid || !roomId) return;
    const colRef = collection(db, "rooms", roomId, "messages").withConverter(
      converter
    );
    await addDoc(colRef, {
      id: colRef.id,
      uid: authUid,
      text: inputText,
      createdAt: serverTimestamp(),
    });
  };

  return { addMessageDoc, messages };
};

export default useMessage;
