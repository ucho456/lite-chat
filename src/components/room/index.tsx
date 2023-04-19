import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "@/contexts/Snackbar";
import { useAppSelector } from "@/store/hooks";
import Form from "@/components/room/Form";
import Header from "@/components/room/Header";
import List from "@/components/room/List";
import "./index.scss";

const Room = () => {
  /** Get room */
  const { roomId } = useParams<{ roomId: string }>();
  const rooms = useAppSelector((state) => state.rooms.rooms);
  const room = rooms.find((r) => r.id === roomId);

  /** Blocked */
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  useEffect(() => {
    if (!room) {
      navigate("/rooms");
      openSnackbar("ブロックされました。", "warning");
    }
  }, [room, navigate, openSnackbar]);

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
