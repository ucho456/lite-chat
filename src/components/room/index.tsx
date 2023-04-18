import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMessage from "@/hooks/useMessage";
import { useAppSelector } from "@/store/hooks";
import { createMessage } from "@/utils/writeToFirestore";
import Body from "@/components/room/Body";
import Footer from "@/components/room/Footer";
import Header from "@/components/room/Header";
import "./index.scss";

export type State = { text: string; height: number };

export type Action = { type: "input"; payload: State } | { type: "reset" };

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
  const pushToRooms = (): void => navigate("/rooms");
  const pushToPhone = (): void => {
    if (!me || !you || !roomId) return;
    navigate(`/room/${roomId}/phone?meUid=${me.uid}&youUid=${you.uid}`);
  };

  /** messages */
  const { messages } = useMessage();

  /** Input text */
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const defaultTextarea = { text: "", height: 70 };
  const [textarea, setTextarea] = useReducer(
    (_state: State, action: Action): State => {
      const textareaHeight = textareaRef.current?.scrollHeight as number;
      const paddingHeight = 20;
      const footerHeight = textareaHeight + paddingHeight;
      const maxHeight = 170;
      if (action.type === "input") {
        return {
          text: action.payload.text,
          height: footerHeight <= maxHeight ? footerHeight : maxHeight,
        };
      } else {
        return { ...defaultTextarea };
      }
    },
    defaultTextarea,
  );

  /** Send message */
  const bodyRef = useRef<HTMLDivElement>(null);
  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ): Promise<void> => {
    e.preventDefault();
    if (!user || !roomId || !room || textarea.text === "") return;
    await createMessage(roomId, user, textarea.text, room);
    setTextarea({ type: "reset" });
    bodyRef.current?.scrollTo(
      0,
      bodyRef.current?.scrollHeight - bodyRef.current?.clientHeight,
    );
  };

  if (!me || !you) return <></>;
  return (
    <>
      <Header you={you} onClickLeave={pushToRooms} onClickPhone={pushToPhone} />
      <Body bodyRef={bodyRef} me={me} messages={messages} />
      <Footer
        height={textarea.height}
        textareaRef={textareaRef}
        value={textarea.text}
        onChange={setTextarea}
        onClick={sendMessage}
      />
    </>
  );
};

export default Room;
