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
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams] = useSearchParams();
  const caller = searchParams.get("caller");
  const [callId, setCallId] = useState<string | null>(
    searchParams.get("callId"),
  );

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
      <Header
        pc={pc}
        localStream={localStream}
        callId={callId}
        roomId={roomId}
        you={you}
      />
      <Videos
        pc={pc}
        localStream={localStream}
        setLocalStream={setLocalStream}
        caller={caller}
        callId={callId}
        setCallId={setCallId}
        roomId={roomId}
      />
    </>
  );
};

export default Phone;
