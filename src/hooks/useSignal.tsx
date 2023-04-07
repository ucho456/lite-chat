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

  const getSignalDocRef = (documentId: string): DocumentReference<Signal> => {
    return getDocRef(collectionName, documentId, signalConverter);
  };

  const deleteSignalDoc = async (documentId: string): Promise<void> => {
    const signalRef = getSignalDocRef(documentId);
    await deleteDoc<Signal>(signalRef);
  };

  const setSignalDoc = async (
    documentId: string,
    signal: Signal
  ): Promise<void> => {
    const signalRef = getSignalDocRef(documentId);
    await setDoc<Signal>(signalRef, signal);
  };

  return { deleteSignalDoc, getSignalDocRef, setSignalDoc };
};

export default useSignal;
