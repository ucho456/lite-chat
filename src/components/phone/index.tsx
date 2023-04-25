import { useState } from "react";
import Videos from "@/components/phone/Videos";
import Wait from "@/components/phone/Wait";

const Phone = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");

  const pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  });

  return (
    <div className="app">
      {currentPage === "home" ? (
        <Wait
          joinCode={joinCode}
          setJoinCode={setJoinCode}
          setPage={setCurrentPage}
        />
      ) : (
        <Videos
          pc={pc}
          mode={currentPage}
          callId={joinCode}
          setPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Phone;
