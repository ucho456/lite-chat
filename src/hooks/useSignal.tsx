import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

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

const converter: FirestoreDataConverter<Signal> = {
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

const useSignal = () => {
  const getSignalDocRef = (signalId: string): DocumentReference<Signal> => {
    return doc(db, signalId).withConverter(converter);
  };

  const setSignalDoc = async (
    signalId: string,
    signal: Signal
  ): Promise<void> => {
    const docRef = doc(db, signalId).withConverter(converter);
    await setDoc(docRef, signal);
  };

  const deleteSignalDoc = async (signalId: string): Promise<void> => {
    const docRef = doc(db, signalId).withConverter(converter);
    await deleteDoc(docRef);
  };

  return { deleteSignalDoc, getSignalDocRef, setSignalDoc };
};

export default useSignal;
