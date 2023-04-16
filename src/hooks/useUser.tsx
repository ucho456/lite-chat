import {
  DocumentData,
  FieldValue,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export type Sex = "man" | "woman";

export type User = {
  uid: string;
  name: string;
  photo: string | null;
  sex: Sex;
  life: number;
  lastActionAt?: Timestamp | FieldValue;
};

export type InputUser = {
  name: string;
  photo: string | null;
  sex: Sex;
};

export type Condition = {
  sex: Sex;
};

const converter: FirestoreDataConverter<User> = {
  toFirestore(u: User): DocumentData {
    return {
      name: u.name,
      photo: u.photo,
      sex: u.sex,
      life: u.life,
      lastActionAt: u.lastActionAt,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const d = snapshot.data();
    return {
      uid: snapshot.id,
      name: d.name,
      photo: d.photo,
      sex: d.sex,
      life: d.life,
    };
  },
};

const useUser = () => {
  const getUserDoc = async (userId: string): Promise<User | null> => {
    const docRef = doc(db, "users", userId).withConverter(converter);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  };

  const getRandomUserDocs = async (condition: Condition): Promise<User[]> => {
    const { sex } = condition;
    const colRef = collection(db, "users").withConverter(converter);
    const q = query(
      colRef,
      where("sex", "==", sex),
      orderBy("lastActionAt", "desc"),
      limit(10)
    );
    const snapshot = await getDocs(q);
    const users: User[] = [];
    snapshot.forEach((doc) => users.push(doc.data()));
    return users;
  };

  const setUserDoc = async (user: User): Promise<void> => {
    const docRef = doc(db, "users", user.uid).withConverter(converter);
    await setDoc(docRef, {
      ...user,
      lastActionAt: serverTimestamp(),
    });
  };

  return { getUserDoc, getRandomUserDocs, setUserDoc };
};

export default useUser;
