import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { MESSAGE_LIMIT } from "@/utils/constants";
import { messageConverter } from "@/utils/converters";
import { db } from "@/firebase";

const useMessage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { roomId } = useParams<{ roomId: string }>();
  useEffect(() => {
    if (!roomId) return;
    const colRef = collection(db, "rooms", roomId, "messages").withConverter(
      messageConverter,
    );
    const q = query(
      colRef,
      orderBy("createdAt", "asc"),
      limitToLast(MESSAGE_LIMIT),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _messages: Message[] = [];
      querySnapshot.forEach((doc) => _messages.push(doc.data()));
      setMessages(_messages);
    });
    return () => unsubscribe();
  }, [roomId]);

  return { messages };
};

export default useMessage;
