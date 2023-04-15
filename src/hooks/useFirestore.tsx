import {
  addDoc as _addDoc,
  collection,
  CollectionReference,
  deleteDoc as _deleteDoc,
  doc,
  DocumentReference,
  FirestoreDataConverter,
  getDoc as _getDoc,
  getDocs as _getDocs,
  setDoc as _setDoc,
  QueryConstraint,
  query,
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

  const getColRef = <T,>(
    collectionName: CollectionName,
    converter: FirestoreDataConverter<T>
  ): CollectionReference<T> => {
    return collection(db, collectionName).withConverter(converter);
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

  const getDocs = async <T,>(
    colRef: CollectionReference<T>,
    queryConstraints?: QueryConstraint[]
  ): Promise<T[]> => {
    const q = queryConstraints
      ? query(colRef, ...queryConstraints)
      : query(colRef);
    const snapshot = await _getDocs(q);
    const result: T[] = [];
    snapshot.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
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

  return {
    addDoc,
    deleteDoc,
    getColRef,
    getDoc,
    getDocs,
    getDocRef,
    getSubColRef,
    setDoc,
  };
};

export default useFirestore;
