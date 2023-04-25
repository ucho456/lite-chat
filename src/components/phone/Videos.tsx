import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

const Videos = ({ pc, mode, callId, setPage }: any) => {
  const [webcamActive, setWebcamActive] = useState(false);

  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);

  const { roomId } = useParams<{ roomId: string }>();
  if (!roomId) return <></>;
  const callDoc = doc(db, "rooms", roomId, "calls", roomId);
  const answerCandidates = doc(db, "rooms", roomId, "answerCandidates", roomId);
  const offerCandidates = doc(db, "rooms", roomId, "offerCandidates", roomId);

  const setupSources = async () => {
    if (!roomId) return;
    console.log("setupSources");
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

    setWebcamActive(true);

    if (mode === "create") {
      pc.onicecandidate = (event) => {
        event.candidate && setDoc(offerCandidates, event.candidate.toJSON());
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDoc, { offer });

      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      onSnapshot(answerCandidates, (snapshot) => {
        if (snapshot.exists()) {
          const candidate = new RTCIceCandidate(snapshot.data());
          pc.addIceCandidate(candidate);
        }
      });
    } else if (mode === "join") {
      pc.onicecandidate = (event) => {
        event.candidate && setDoc(answerCandidates, event.candidate.toJSON());
      };

      const callData = (await getDoc(callDoc)).data();
      console.log({ callData });

      const offerDescription = callData?.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription),
      );
      console.log(1);

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);
      console.log(2);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };
      console.log(3);

      await updateDoc(callDoc, { answer });
      console.log(4);

      onSnapshot(offerCandidates, (snapshot) => {
        if (snapshot.exists()) {
          const candidate = new RTCIceCandidate(snapshot.data());
          pc.addIceCandidate(candidate);
        }
      });
    }

    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
        hangUp();
      }
    };
  };

  const hangUp = async () => {
    pc.close();

    await deleteDoc(answerCandidates);
    await deleteDoc(offerCandidates);
    await deleteDoc(callDoc);

    window.location.reload();
  };

  return (
    <div className="videos">
      <video ref={localRef} autoPlay playsInline className="local" muted />
      <video ref={remoteRef} autoPlay playsInline className="remote" />

      <div className="buttonsContainer">
        <button
          onClick={hangUp}
          disabled={!webcamActive}
          className="hangup button"
        >
          HangUp
        </button>
        <div tabIndex={0} role="button" className="more button">
          More
          <div className="popover">
            {/* <button
              onClick={() => {
                navigator.clipboard.writeText(roomId);
              }}
            >
              Copy joining code
            </button> */}
          </div>
        </div>
      </div>

      {!webcamActive && (
        <div className="modalContainer">
          <div className="modal">
            <h3>Turn on your camera and microphone and start the call</h3>
            <div className="container">
              <button onClick={() => setPage("home")} className="secondary">
                Cancel
              </button>
              <button onClick={setupSources}>Start</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
