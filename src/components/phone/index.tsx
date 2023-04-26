import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { deletePhoneDocs } from "@/utils/firestore";
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

  /** Post-processing when unmounting */
  useEffect(() => {
    return () => {
      if (!roomId) return;
      deletePhoneDocs(roomId);
    };
  }, [roomId]);

  if (!roomId) return <></>;
  return (
    <>
      <Videos pc={pc} mode={creator} roomId={roomId} />
    </>
  );
};

export default Phone;
