import { useEffect, useRef } from "react";
import RtcClient from "@/utils/RtcClient";

type Props = {
  rtcClient: RtcClient;
};

const VideoLocal = (props: Props) => {
  const { rtcClient } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideoRef = videoRef.current;
  const mediaStream = rtcClient.mediaStream;

  useEffect(() => {
    if (!currentVideoRef) return;
    const getMedia = () => {
      try {
        currentVideoRef.srcObject = mediaStream;
      } catch (error: any) {
        alert(error.message);
      }
    };
    getMedia();
  }, [currentVideoRef, mediaStream]);

  if (rtcClient.localPeerName === "" || rtcClient.remotePeerName === "")
    return <></>;

  return (
    <div>
      <video autoPlay muted ref={videoRef} />
    </div>
  );
};

export default VideoLocal;
