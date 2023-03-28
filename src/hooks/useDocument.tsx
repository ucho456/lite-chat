import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onSnapshot, doc, FirestoreDataConverter } from "firebase/firestore";

const useDocument = <T,>(
  collectionName: string,
  documentId: string | null | undefined,
  converter: FirestoreDataConverter<T>,
  defaultValue: T
) => {
  const [document, setDocument] = useState<T>(defaultValue);

  useEffect(() => {
    if (!documentId) {
      return;
    }

    const ref = doc(db, collectionName, documentId).withConverter(converter);

    const unsubscribe = onSnapshot(ref, (doc) => {
      if (doc.exists()) {
        setDocument(doc.data());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [documentId]);

  return { document, setDocument };
};

export default useDocument;
