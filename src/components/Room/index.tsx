import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Form from "@/components/Room/Form";
import Header from "@/components/Room/Header";
import List from "@/components/Room/List";
import { useAppSelector } from "@/store/hooks";
import { readMessage } from "@/utils/firestore";

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

  /** Messages body ref */
  const bodyRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const handleNavigateRooms = (): void => navigate("/rooms");

  if (!me || !you || !user || !room)
    return (
      <div className="room-blocked">
        <div>相手ユーザーにブロックされました。</div>
        <Button variant="contained" onClick={handleNavigateRooms}>
          もどる
        </Button>
      </div>
    );
  return (
    <>
      <Header me={me} you={you} />
      <List bodyRef={bodyRef} me={me} />
      <Form user={user} room={room} bodyRef={bodyRef} />
    </>
  );
};

export default Room;
