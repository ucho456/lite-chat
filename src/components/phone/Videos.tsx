import { useRef, useState } from "react";
import { getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { deleteWebRTC, getWebRTCDocRef } from "@/utils/firestore";

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
    getWebRTCDocRef(roomId);

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
            setDoc(offerCandidateDocRef, event.candidate.toJSON());
        };
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);
        await setDoc(callDocRef, {
          offer: { sdp: offerDescription.sdp ?? "", type: "offer" },
          answer: null,
        });
        onSnapshot(callDocRef, (snapshot) => {
          const data = snapshot.data();
          if (!pc.currentRemoteDescription && data?.answer) {
            const answerDescription = new RTCSessionDescription(data.answer);
            pc.setRemoteDescription(answerDescription);
          }
        });
        onSnapshot(answerCandidateDocRef, (snapshot) => {
          if (snapshot.exists()) {
            const candidate = new RTCIceCandidate(snapshot.data());
            pc.addIceCandidate(candidate);
          }
        });
        break;
      }
      case null: {
        pc.onicecandidate = (event) => {
          event.candidate &&
            setDoc(answerCandidateDocRef, event.candidate.toJSON());
        };
        const callData = (await getDoc(callDocRef)).data();
        const offerDescription = callData!.offer!;
        await pc.setRemoteDescription(
          new RTCSessionDescription(offerDescription),
        );
        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);
        await updateDoc(callDocRef, {
          answer: {
            sdp: answerDescription.sdp,
            type: "answer",
          },
        });
        onSnapshot(offerCandidateDocRef, (snapshot) => {
          if (snapshot.exists()) {
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

  const hangUp = async () => {
    pc.close();
    await deleteWebRTC(roomId);
    window.location.reload();
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
