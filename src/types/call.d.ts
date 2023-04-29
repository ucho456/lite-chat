type Offer = {
  sdp: string;
  type: "offer";
};

type Answer = {
  sdp: string;
  type: "answer";
};

type Call = {
  offer: Offer | null;
  answer: Answer | null;
};

type Candidate = {
  candidate: string;
  sdpMid: string;
  sdpMLineIndex: number;
  usernameFragment: string;
};

type OfferCandidate = Candidate;

type AnswerCandidate = Candidate;
