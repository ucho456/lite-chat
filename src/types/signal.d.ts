type SignalType = "offer" | "answer" | "candidate";

type SessionDescription = {
  type: RTCSdpType;
  sdp?: string;
};

type Signal = {
  type: SignalType;
  sender: string;
  sessionDescription: SessionDescription;
  candidate: RTCIceCandidateInit | null;
};
