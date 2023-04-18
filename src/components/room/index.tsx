import { MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMessage from "@/hooks/useMessage";
import { useAppSelector } from "@/store/hooks";
import { createMessage } from "@/utils/writeToFirestore";
import Body from "@/components/room/Body";
import Footer from "@/components/room/Footer";
import Header from "@/components/room/Header";
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

  /** Routing */
  const navigate = useNavigate();
  const onLeave = () => navigate("/rooms");
  const onPushToPhone = () => {
    if (!me || !you || !roomId) return;
    navigate(`/room/${roomId}/phone?meUid=${me.uid}&youUid=${you.uid}`);
  };

  /** messages */
  const { messages } = useMessage();

  /** Send message */
  const [inputText, setInputText] = useState<string>("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const sendMessage = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ): Promise<void> => {
    e.preventDefault();
    if (
      !user ||
      !roomId ||
      !bodyRef ||
      !bodyRef.current ||
      !room ||
      inputText === ""
    ) {
      return;
    }
    await createMessage(roomId, user, inputText, room);
    setInputText("");
    bodyRef.current.scrollTo(
      0,
      bodyRef.current.scrollHeight - bodyRef.current.clientHeight,
    );
  };

  if (!me || !you) return <></>;
  return (
    <>
      <Header you={you} onClickLeave={onLeave} onClickPhone={onPushToPhone} />
      <Body bodyRef={bodyRef} me={me} messages={messages} />
      <Footer value={inputText} onChange={setInputText} onClick={sendMessage} />
    </>
  );
};

export default Room;
