import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection as _collection,
  FirestoreDataConverter,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";

const useCollection = <T,>(
  collectionName: string,
  converter: FirestoreDataConverter<T>,
  queryConstraints?: QueryConstraint[],
  limitNum?: number
) => {
  const [collection, setCollection] = useState<T[]>([]);

  useEffect(() => {
    const colRef = _collection(db, collectionName).withConverter(converter);

    const q = queryConstraints
      ? query(colRef, ...queryConstraints)
      : query(colRef);

    const unsubscribe = onSnapshot(q, (querySnap) => {
      const result: T[] = [];
      querySnap.forEach((doc) => {
        result.push(doc.data());
      });
      setCollection(result);
    });

    return () => {
      unsubscribe();
    };
  }, [limitNum]);

  return { collection, setCollection };
};

export default useCollection;
