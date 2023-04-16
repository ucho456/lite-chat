import {
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
import { messageConverter } from "../utils/converters";

const useMessage = () => {
  /** Get reactive messages collection. */
  const [messages, setMessages] = useState<Message[]>([]);
  const { roomId } = useParams<{ roomId: string }>();
  useEffect(() => {
    if (!roomId) return;
    const colRef = collection(db, "rooms", roomId, "messages").withConverter(
      messageConverter
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
      messageConverter
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
