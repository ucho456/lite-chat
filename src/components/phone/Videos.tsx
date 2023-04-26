import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import {
  createAnswerCandidate,
  createCall,
  createOfferCandidate,
  fetchCall,
  getPhoneDocRefs,
  updateCall,
} from "@/utils/firestore";

type Props = {
  pc: RTCPeerConnection;
  mode: string | null;
  roomId: string;
};

const Videos = ({ pc, mode, roomId }: Props) => {
  const [webcameraActive, setWebcameraActive] = useState(false);
  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);
  const { callDocRef, offerCandidateDocRef, answerCandidateDocRef } =
    getPhoneDocRefs(roomId);

  const setupSources = async () => {
    if (!roomId) return;
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    localRef.current!.srcObject = localStream;
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
            pc.addIceCandidate(candidate);
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
            pc.addIceCandidate(candidate);
          }
        });
        break;
      }
    }

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "disconnected") {
        hangUp();
      }
    };
  };

  const navigate = useNavigate();
  const hangUp = async () => {
    // pc.close();
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div className="videos">
      <video ref={localRef} autoPlay playsInline className="local" muted />
      <video ref={remoteRef} autoPlay playsInline className="remote" />

      <div className="buttonsContainer">
        <button
          onClick={hangUp}
          disabled={!webcameraActive}
          className="hangup button"
        >
          HangUp
        </button>
      </div>

      {!webcameraActive && (
        <div className="modalContainer">
          <div className="modal">
            <h3>Turn on your camera and microphone and start the call</h3>
            <div className="container">
              <button onClick={setupSources}>Start</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
