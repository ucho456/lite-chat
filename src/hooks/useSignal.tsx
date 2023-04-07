import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import useFirestore from "./useFirestore";

export type SignalType = "offer" | "answer" | "candidate";

export type SessionDescription = {
  type: RTCSdpType;
  sdp?: string;
};

export type Signal = {
  type: SignalType;
  sender: string;
  sessionDescription: SessionDescription;
  candidate: RTCIceCandidateInit | null;
};

const useSignal = () => {
  const { deleteDoc, getDocRef, setDoc } = useFirestore();

  const signalConverter: FirestoreDataConverter<Signal> = {
    toFirestore(s: Signal): DocumentData {
      return {
        type: s.type,
        sender: s.sender,
        sessionDescription: s.sessionDescription,
        candidate: s.candidate,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Signal {
      const d = snapshot.data();
      return {
        type: d.type,
        sender: d.sender,
        sessionDescription: d.sessionDescription,
        candidate: d.candidate,
      };
    },
  };

  const collectionName = "signals";

  const getSignalDocRef = (signalId: string): DocumentReference<Signal> => {
    return getDocRef(collectionName, signalId, signalConverter);
  };

  const deleteSignalDoc = async (signalId: string): Promise<void> => {
    const signalRef = getSignalDocRef(signalId);
    await deleteDoc<Signal>(signalRef);
  };

  const setSignalDoc = async (
    signalId: string,
    signal: Signal
  ): Promise<void> => {
    const signalRef = getSignalDocRef(signalId);
    await setDoc<Signal>(signalRef, signal);
  };

  return { deleteSignalDoc, getSignalDocRef, setSignalDoc };
};

export default useSignal;
