import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import Header from "@/components/phone/Header";
import Videos from "@/components/phone/Videos";

const Phone = () => {
  const pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  });

  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams] = useSearchParams();
  const creator = searchParams.get("creator");

  /** Set you */
  const rooms = useAppSelector((state) => state.rooms.rooms);
  const room = rooms.find((r) => r.id === roomId);
  const user = useAppSelector((state) => state.user.user);
  const [you, setYou] = useState<RoomUser | null>(null);
  useEffect(() => {
    if (!room || !user) return;
    if (room.invitedUser.uid === user.uid) {
      setYou(room.inviteeUser);
    } else {
      setYou(room.invitedUser);
    }
  }, [room, user]);

  if (!roomId || !you) return <></>;
  return (
    <>
      <Header pc={pc} roomId={roomId} you={you} />
      <Videos pc={pc} mode={creator} roomId={roomId} />
    </>
  );
};

export default Phone;
