import { Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import RtcClient, { SetRtcClient } from "../../utils/RtcClient";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const RoomVideoPhone = () => {
  const [searchParams] = useSearchParams();
  const meUid = searchParams.get("meUid");
  const youUid = searchParams.get("youUid");

  const [rtcClient, _setRtcClient] = useState<RtcClient | null>(null);

  const setRtcClient: SetRtcClient = (
    rtcClient: RtcClient,
    meUid: string,
    youUid: string
  ): void => {
    _setRtcClient(rtcClient);
    rtcClient.setUids(meUid, youUid);
  };

  useEffect(() => {
    if (!meUid || !youUid) return;
    const initialize = async () => {
      const client = new RtcClient(setRtcClient);
      client.setUids(meUid, youUid);
      await client.getUserMedia();
      client.setRtcClient();
    };
    initialize();
  }, [meUid, youUid]);

  const meVideoRef = useRef<HTMLVideoElement>(null);
  const currentMeVideoRef = meVideoRef.current;

  useEffect(() => {
    if (!currentMeVideoRef || !rtcClient) return;
    const getMedia = () => {
      try {
        currentMeVideoRef.srcObject = rtcClient.mediaStream;
      } catch (error: any) {
        alert(error.message);
      }
    };
    getMedia();
  }, [currentMeVideoRef, rtcClient]);

  const youVideoRef = useRef<HTMLVideoElement>(null);

  const navigate = useNavigate();
  const { roomId } = useParams();
  const handleFinish = () => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div>
      <video autoPlay muted ref={meVideoRef} />
      <Button onClick={handleFinish}>終了</Button>
    </div>
  );
};

export default RoomVideoPhone;
