import { useReducer, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSnackbar } from "@/contexts/Snackbar";
import useOneTimeMountEffect from "@/hooks/useOneTimeMountEffect";
import useSignal from "@/hooks/useSignal";

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

  const { deleteSignalDoc, getSignalDocRef, setSignalDoc } = useSignal();
  // const startListening = async () => {
  //   if (!localPeerName) return;
  //   await deleteSignalDoc(localPeerName);
  //   const signalRef = getSignalDocRef(localPeerName);
  //   onSnapshot(signalRef, async (doc) => {
  //     if (doc.exists()) {
  //       const { candidate, sender, sessionDescription, type } = doc.data();
  //       switch (type) {
  //         case "offer":
  //           await sendAnswer(sender, sessionDescription);
  //       }
  //     }
  //   });
  // };

  const handleConnect = async () => {
    await sendOffer();
  };

  const { openSnackbar } = useSnackbar();

  const sendOffer = async () => {
    if (!remotePeerName || !localPeerName) return;
    try {
      const offer = await rtcPeerConnection.createOffer();
      await rtcPeerConnection.setLocalDescription(offer);
      if (rtcPeerConnection.localDescription) {
        await setSignalDoc(remotePeerName, {
          type: "offer",
          sender: localPeerName,
          sessionDescription: { type: offer.type, sdp: offer.sdp },
          candidate: null,
        });
      }
    } catch (error) {
      openSnackbar("error sendOffer", "error");
    }
  };

  // useEffect(() => {
  //   if (rtcPeerConnection && !localVideoRef.current) {
  //     //
  //   }
  // }, [rtcPeerConnection, localVideoRef.current]);

  return {
    handleConnect,
    localVideoRef,
    remoteVideoRef,
    rtcPeerConnection,
  };
};

export default useRtcClient;
