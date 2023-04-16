import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { messageConverter } from "../utils/converters";

const useMessage = () => {
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

  return { messages };
};

export default useMessage;
