import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Videocam,
  VideocamOff,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Unsubscribe, onSnapshot } from "firebase/firestore";
import useOneTimeMountEffect from "@/hooks/useOneTimeMountEffect";
import {
  createAnswerCandidate,
  createCall,
  createOfferCandidate,
  fetchCall,
  getCallColRef,
  getCandidateDocRefs,
  updateCall,
} from "@/utils/firestore";
import "./Videos.scss";

type Props = {
  pc: RTCPeerConnection;
  localStream: MediaStream | null;
  setLocalStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
  caller: string | null;
  callId: string | null;
  setCallId: React.Dispatch<React.SetStateAction<string | null>>;
  roomId: string;
  setCallUnsubscribe: React.Dispatch<React.SetStateAction<Unsubscribe | null>>;
  setOfferUnsubscribe: React.Dispatch<React.SetStateAction<Unsubscribe | null>>;
  setAnswerUnsubscribe: React.Dispatch<
    React.SetStateAction<Unsubscribe | null>
  >;
};

/* eslint-disable  @typescript-eslint/no-non-null-assertion */
const Videos = ({
  pc,
  localStream,
  setLocalStream,
  caller,
  callId,
  setCallId,
  roomId,
  setCallUnsubscribe,
  setOfferUnsubscribe,
  setAnswerUnsubscribe,
}: Props) => {
  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);
  const { offerCandidateDocRef, answerCandidateDocRef } =
    getCandidateDocRefs(roomId);
  const navigate = useNavigate();

  let callUnsubscribe: Unsubscribe | null = null;
  let answerUnsubscribe: Unsubscribe | null = null;
  let offerUnsubscribe: Unsubscribe | null = null;
  useOneTimeMountEffect(() => {
    return () => {
      if (callUnsubscribe) callUnsubscribe();
      if (offerUnsubscribe) offerUnsubscribe();
      if (answerUnsubscribe) answerUnsubscribe();
    };
  });

  const setupSources = async () => {
    if (!roomId) return;
    const _localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(_localStream);
    const remoteStream = new MediaStream();
    _localStream.getTracks().forEach((track) => {
      pc.addTrack(track, _localStream);
    });
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    localRef.current!.srcObject = _localStream;
    remoteRef.current!.srcObject = remoteStream;

    /** Create offer and watch answer */
    if (caller === "true") {
      pc.onicecandidate = (event) => {
        event.candidate &&
          createOfferCandidate(roomId, event.candidate.toJSON());
      };
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);
      await createCall(roomId, {
        sdp: offerDescription.sdp ?? "",
        type: "offer",
      });
      const callColRef = getCallColRef(roomId);
      callUnsubscribe = onSnapshot(callColRef, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setCallId(change.doc.id);
          } else if (change.type === "modified") {
            const call = change.doc.data();
            if (!pc.currentRemoteDescription && call.answer) {
              const answerDescription = new RTCSessionDescription(call.answer);
              pc.setRemoteDescription(answerDescription);
            }
          }
        });
      });
      answerUnsubscribe = onSnapshot(answerCandidateDocRef, (snapshot) => {
        if (snapshot.exists() && pc.signalingState !== "closed") {
          const candidate = new RTCIceCandidate(snapshot.data());
          if (candidate) pc.addIceCandidate(candidate);
        }
      });
    }

    if (callId && !caller) {
      pc.onicecandidate = (event) => {
        event.candidate &&
          createAnswerCandidate(roomId, event.candidate.toJSON());
      };
      const call = await fetchCall(roomId, callId);
      if (!call || !call.offer) return;
      const offerDescription = call.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription),
      );
      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);
      await updateCall(roomId, callId, {
        sdp: answerDescription.sdp!,
        type: "answer",
      });
      offerUnsubscribe = onSnapshot(offerCandidateDocRef, (snapshot) => {
        if (snapshot.exists() && pc.signalingState !== "closed") {
          const candidate = new RTCIceCandidate(snapshot.data());
          if (candidate) pc.addIceCandidate(candidate);
        }
      });
    }

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "disconnected") {
        navigate(`/rooms/${roomId}`);
      }
    };
  };

  useOneTimeMountEffect(() => {
    setupSources();
  });

  const [isVideo, setIsVideo] = useState(true);
  const handleToggleLocalVideo = () => {
    if (!localStream) return;
    const videoTrack = localStream.getVideoTracks()[0];
    const enabled = videoTrack.enabled;
    videoTrack.enabled = !enabled;
    setIsVideo(!enabled);
  };

  const [isAudio, setIsAudio] = useState(true);
  const handleToggleLocalAudio = () => {
    if (!localStream) return;
    const audioTrack = localStream.getAudioTracks()[0];
    const enabled = audioTrack.enabled;
    audioTrack.enabled = !enabled;
    setIsAudio(!enabled);
  };

  return (
    <div className="phone-videos">
      <div className="videos-container">
        <video className="remote" ref={remoteRef} autoPlay playsInline />
        <video className="local" ref={localRef} autoPlay playsInline muted />
        <div className="buttons" style={{ color: "white" }}>
          <IconButton onClick={handleToggleLocalVideo}>
            {isVideo ? <Videocam /> : <VideocamOff />}
          </IconButton>
          <IconButton onClick={handleToggleLocalAudio}>
            {isAudio ? <VolumeUp /> : <VolumeOff />}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Videos;
