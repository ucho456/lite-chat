import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  FirestoreDataConverter,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";

const useSubCollection = <T,>(
  parentCollectionName: string,
  parentDocumentId: string | null | undefined,
  subCollectionName: string,
  converter: FirestoreDataConverter<T>,
  queryConstraints?: QueryConstraint[]
) => {
  const [subCollection, setSubCollection] = useState<T[]>([]);

  useEffect(() => {
    if (!parentDocumentId) {
      return;
    }

    const collectionRef = collection(
      db,
      parentCollectionName,
      parentDocumentId,
      subCollectionName
    ).withConverter(converter);

    const q = queryConstraints
      ? query(collectionRef, ...queryConstraints)
      : query(collectionRef);

    const unsubscribe = onSnapshot(q, (querySnap) => {
      const result: T[] = [];
      querySnap.forEach((doc) => {
        result.push(doc.data());
      });
      setSubCollection(result);
    });

    return () => {
      unsubscribe();
    };
  }, [parentDocumentId]);

  return { subCollection, setSubCollection };
};

export default useSubCollection;
