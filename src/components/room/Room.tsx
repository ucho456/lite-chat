import { MouseEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { createMessage } from "@/utils/writeToFirestore";
import RoomBody from "@/components/room/RoomBody";
import RoomFooter from "@/components/room/RoomFooter";
import RoomHeader from "@/components/room/RoomHeader";
import "./Room.scss";

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const rooms = useAppSelector((state) => state.rooms.rooms);
  const room = rooms.find((r) => r.id === roomId);

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

  const [inputText, setInputText] = useState<string>("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const sendMessage = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
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
      <RoomHeader me={me} you={you} />
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
