import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onSnapshot, doc, FirestoreDataConverter } from "firebase/firestore";

const useDocument = <T,>(
  collectionName: string,
  documentId: string,
  converter: FirestoreDataConverter<T>
): {
  document: T | null;
  setDocument: React.Dispatch<React.SetStateAction<T | null>>;
} => {
  const [document, setDocument] = useState<T | null>(null);

  useEffect(() => {
    const ref = doc(db, collectionName, documentId).withConverter(converter);
    const unsubscribe = onSnapshot(ref, (doc) => {
      if (doc.exists()) setDocument(doc.data());
    });
    return () => unsubscribe();
  }, [documentId]);

  return { document, setDocument };
};

export default useDocument;
