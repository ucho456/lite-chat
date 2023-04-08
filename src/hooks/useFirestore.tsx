import {
  addDoc as _addDoc,
  collection,
  CollectionReference,
  deleteDoc as _deleteDoc,
  doc,
  DocumentReference,
  FirestoreDataConverter,
  getDoc as _getDoc,
  setDoc as _setDoc,
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

  const getSubColRef = <T,>(
    parentCollectionName: CollectionName,
    parentId: string,
    subCollectionName: CollectionName,
    converter: FirestoreDataConverter<T>
  ): CollectionReference<T> => {
    return collection(
      db,
      parentCollectionName,
      parentId,
      subCollectionName
    ).withConverter(converter);
  };

  const addDoc = async <T,>(
    colRef: CollectionReference<T>,
    data: T
  ): Promise<void> => {
    await _addDoc(colRef, data);
  };

  const getDoc = async <T,>(
    docRef: DocumentReference<T>
  ): Promise<T | null> => {
    const snapshot = await _getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  };

  const setDoc = async <T,>(
    docRef: DocumentReference<T>,
    data: T
  ): Promise<void> => {
    await _setDoc(docRef, data);
  };

  const deleteDoc = async <T,>(docRef: DocumentReference<T>): Promise<void> => {
    await _deleteDoc(docRef);
  };

  return { addDoc, deleteDoc, getDoc, getDocRef, getSubColRef, setDoc };
};

export default useFirestore;
