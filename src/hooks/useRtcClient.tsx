import { useReducer, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useOneTimeMountEffect from "./useOneTimeMountEffect";

type Action = {
  type: "setLocalMediaStream";
  payload: {
    mediaStream: MediaStream;
    audioTrack: MediaStreamTrack;
    videoTrack: MediaStreamTrack;
  };
};

const useRtcClient = () => {
  console.log("useRtcClient 一番上");
  const [isCalled, setIsCalled] = useState(false);
  const [rtcPeerConnection, setRtcPeerConnection] = useReducer(
    (
      _rtcPeerConnection: RTCPeerConnection,
      action: Action,
    ): RTCPeerConnection => {
      if (action.type === "setLocalMediaStream" && !isCalled) {
        setIsCalled(true);
        const { mediaStream, audioTrack, videoTrack } = action.payload;
        _rtcPeerConnection.addTrack(audioTrack, mediaStream);
        _rtcPeerConnection.addTrack(videoTrack, mediaStream);
        return _rtcPeerConnection;
      } else {
        return _rtcPeerConnection;
      }
    },
    new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    }),
  );

  const [searchParams] = useSearchParams();
  const localPeerName = searchParams.get("meUid");
  const remotePeerName = searchParams.get("youUid");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useOneTimeMountEffect(() => {
    setIsCalled(true);
    const setMediaStream = async () => {
      console.log("setMediaStream開始");
      const constrains = { audio: true, video: true };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constrains);
      const audioTrack = mediaStream.getAudioTracks()[0];
      const videoTrack = mediaStream.getVideoTracks()[0];
      setRtcPeerConnection({
        type: "setLocalMediaStream",
        payload: { mediaStream, audioTrack, videoTrack },
      });
      localVideoRef.current!.srcObject = mediaStream;
    };
    setMediaStream();
  });

  // useEffect(() => {
  //   if (rtcPeerConnection && !localVideoRef.current) {
  //     //
  //   }
  // }, [rtcPeerConnection, localVideoRef.current]);

  return {
    localPeerName,
    localVideoRef,
    remotePeerName,
    remoteVideoRef,
    rtcPeerConnection,
  };
};

export default useRtcClient;
