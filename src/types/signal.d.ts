type SignalType = "offer" | "answer" | "candidate";

type SessionDescription = {
  sdp: string;
  type: RTCSdpType;
};

type Signal = {
  type: SignalType;
  sender: string;
  sessionDescription: SessionDescription | null;
  candidate: RTCIceCandidateInit | null;
};
