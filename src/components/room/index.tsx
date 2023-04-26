import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import { useAppSelector } from "@/store/hooks";
import { getPhoneDocRefs, readMessage } from "@/utils/firestore";
import Form from "@/components/room/Form";
import Header from "@/components/room/Header";
import List from "@/components/room/List";
import "./index.scss";

const Room = () => {
  /** Get room */
  const { roomId } = useParams<{ roomId: string }>();
  const rooms = useAppSelector((state) => state.rooms.rooms);
  const room = rooms.find((r) => r.id === roomId);

  /** Set me and you */
  const user = useAppSelector((state) => state.user.user);
  const [me, setMe] = useState<RoomUser | null>(null);
  const [you, setYou] = useState<RoomUser | null>(null);
  useEffect(() => {
    if (!room || !user) return;
    const userA = room.inviteeUser;
    const userB = room.invitedUser;
    if (userA.uid === user.uid) {
      setMe(userA);
      setYou(userB);
    } else {
      setMe(userB);
      setYou(userA);
    }
  }, [room, user]);

  /** Read message when in room */
  useEffect(() => {
    if (!me || !room) return;
    if (me.unread) readMessage(me, room);
  }, [me, room]);

  /** Watch phone request */
  const navigate = useNavigate();
  useEffect(() => {
    if (!roomId || !you) return;
    const { callDocRef } = getPhoneDocRefs(roomId);
    const unsubscribe = onSnapshot(callDocRef, async (doc) => {
      if (doc.exists()) {
        const result = window.confirm(
          `${you.name}さんから電話のリクエストを受けました。応答しますか？`,
        );
        if (result) {
          navigate(`/rooms/${roomId}/phone`);
        } else {
          // await deletePhoneDocs(roomId);
        }
      }
    });
    return () => unsubscribe();
  }, [roomId, navigate, you]);

  /** Messages body ref */
  const bodyRef = useRef<HTMLDivElement>(null);

  if (!me || !you || !user || !room) return <></>;
  return (
    <>
      <Header me={me} you={you} />
      <List bodyRef={bodyRef} me={me} />
      <Form user={user} room={room} bodyRef={bodyRef} />
    </>
  );
};

export default Room;
