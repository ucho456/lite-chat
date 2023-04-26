import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Videocam,
  VideocamOff,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { onSnapshot } from "firebase/firestore";
import {
  createAnswerCandidate,
  createCall,
  createOfferCandidate,
  fetchCall,
  getPhoneDocRefs,
  updateCall,
} from "@/utils/firestore";
import "./Videos.scss";

type Props = {
  pc: RTCPeerConnection;
  mode: string | null;
  roomId: string;
};

/* eslint-disable  @typescript-eslint/no-non-null-assertion */
const Videos = ({ pc, mode, roomId }: Props) => {
  const [webcameraActive, setWebcameraActive] = useState(false);
  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);
  const { callDocRef, offerCandidateDocRef, answerCandidateDocRef } =
    getPhoneDocRefs(roomId);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const navigate = useNavigate();

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
    setWebcameraActive(true);

    switch (mode) {
      case "true": {
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
        onSnapshot(callDocRef, (snapshot) => {
          const data = snapshot.data();
          if (!pc.currentRemoteDescription && data?.answer) {
            const answerDescription = new RTCSessionDescription(data.answer);
            pc.setRemoteDescription(answerDescription);
          }
        });
        onSnapshot(answerCandidateDocRef, (snapshot) => {
          if (snapshot.exists() && pc.signalingState !== "closed") {
            const candidate = new RTCIceCandidate(snapshot.data());
            if (candidate) pc.addIceCandidate(candidate);
          }
        });
        break;
      }
      case null: {
        pc.onicecandidate = (event) => {
          event.candidate &&
            createAnswerCandidate(roomId, event.candidate.toJSON());
        };
        const call = await fetchCall(roomId);
        if (!call || !call.offer) return;
        const offerDescription = call.offer;
        await pc.setRemoteDescription(
          new RTCSessionDescription(offerDescription),
        );
        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);
        await updateCall(roomId, {
          sdp: answerDescription.sdp!,
          type: "answer",
        });
        onSnapshot(offerCandidateDocRef, (snapshot) => {
          if (snapshot.exists() && pc.signalingState !== "closed") {
            const candidate = new RTCIceCandidate(snapshot.data());
            if (candidate) pc.addIceCandidate(candidate);
          }
        });
        break;
      }
    }

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "disconnected") {
        navigate(`/rooms/${roomId}`);
      }
    };
  };

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
      {!webcameraActive && (
        <div className="wait-container">
          <p>カメラとマイクをオンにしてスタートボタンを押してください</p>
          <Button variant="contained" onClick={setupSources}>
            スタート
          </Button>
        </div>
      )}
      <div className="videos-container">
        <video className="remote" ref={remoteRef} autoPlay playsInline />
        <video className="local" ref={localRef} autoPlay playsInline muted />
        {webcameraActive && (
          <div className="buttons" style={{ color: "white" }}>
            <IconButton onClick={handleToggleLocalVideo}>
              {isVideo ? <Videocam /> : <VideocamOff />}
            </IconButton>
            <IconButton onClick={handleToggleLocalAudio}>
              {isAudio ? <VolumeUp /> : <VolumeOff />}
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
