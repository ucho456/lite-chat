import {
  deleteDoc as _deleteDoc,
  FirestoreDataConverter,
  setDoc as _setDoc,
  doc,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../firebase";

type CollectionName = "messages" | "rooms" | "signals" | "users";

const useFirestore = () => {
  const getDocRef = <T,>(
    collectionName: CollectionName,
    documentId: string,
    converter: FirestoreDataConverter<T>
  ): DocumentReference<T> => {
    return doc(db, collectionName, documentId).withConverter(converter);
  };

  const deleteDoc = async <T,>(docRef: DocumentReference<T>) => {
    await _deleteDoc(docRef);
  };

  const setDoc = async <T,>(
    docRef: DocumentReference<T>,
    data: T
  ): Promise<void> => {
    await _setDoc(docRef, data);
  };

  return { deleteDoc, getDocRef, setDoc };
};

export default useFirestore;
