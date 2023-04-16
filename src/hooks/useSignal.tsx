import { DocumentReference, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { signalConverter } from "../utils/converters";

const useSignal = () => {
  const getSignalDocRef = (signalId: string): DocumentReference<Signal> => {
    return doc(db, signalId).withConverter(signalConverter);
  };

  const setSignalDoc = async (
    signalId: string,
    signal: Signal
  ): Promise<void> => {
    const docRef = doc(db, signalId).withConverter(signalConverter);
    await setDoc(docRef, signal);
  };

  const deleteSignalDoc = async (signalId: string): Promise<void> => {
    const docRef = doc(db, signalId).withConverter(signalConverter);
    await deleteDoc(docRef);
  };

  return { deleteSignalDoc, getSignalDocRef, setSignalDoc };
};

export default useSignal;
