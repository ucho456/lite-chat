import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

// Initialize WebRTC
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");

  return (
    <div className="app">
      {currentPage === "home" ? (
        <Menu
          joinCode={joinCode}
          setJoinCode={setJoinCode}
          setPage={setCurrentPage}
        />
      ) : (
        <Videos mode={currentPage} callId={joinCode} setPage={setCurrentPage} />
      )}
    </div>
  );
}

function Menu({ joinCode, setJoinCode, setPage }: any) {
  return (
    <div className="home">
      <div className="create box">
        <button onClick={() => setPage("create")}>Create Call</button>
      </div>

      <div className="answer box">
        <input
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Join with code"
        />
        <button onClick={() => setPage("join")}>Answer</button>
      </div>
    </div>
  );
}

function Videos({ mode, callId, setPage }: any) {
  const [webcamActive, setWebcamActive] = useState(false);
  // const [roomId, setRoomId] = useState(callId);

  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);

  const { roomId } = useParams<{ roomId: string }>();

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
      console.log({ mode });
      const callDoc = doc(db, "rooms", roomId, "calls", roomId);
      const offerCandidates = collection(
        db,
        "rooms",
        roomId,
        "offerCandidates",
      );
      const answerCandidates = collection(
        db,
        "rooms",
        roomId,
        "answerCandidates",
      );

      // setRoomId(callDoc.id);

      pc.onicecandidate = (event) => {
        event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
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
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    } else if (mode === "join") {
      const callDoc = doc(db, "rooms", roomId, "calls", roomId);
      const answerCandidates = collection(
        db,
        "rooms",
        roomId,
        "answerCandidates",
      );
      const offerCandidates = collection(
        db,
        "rooms",
        roomId,
        "offerCandidates",
      );

      pc.onicecandidate = (event) => {
        event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
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
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
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

    // if (roomId) {
    //   const roomRef = doc(db, "calls", roomId);
    //   await roomRef
    //     .collection("answerCandidates")
    //     .get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         doc.ref.delete();
    //       });
    //     });
    //   await roomRef
    //     .collection("offerCandidates")
    //     .get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         doc.ref.delete();
    //       });
    //     });

    //   await roomRef.delete();
    // }

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
}

export default App;
