import { MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { createMessage } from "@/utils/writeToFirestore";
import Header from "@/components/room/Header";
import RoomBody from "@/components/room/RoomBody";
import RoomFooter from "@/components/room/RoomFooter";
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
    <div className="room">
      <Header you={you} onClickLeave={onLeave} onClickPhone={onPushToPhone} />
      <RoomBody me={me} bodyRef={bodyRef} />
      <RoomFooter
        value={inputText}
        onChange={setInputText}
        onClick={sendMessage}
      />
    </div>
  );
};

export default Room;
