import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  limit,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import useFirestore from "./useFirestore";

export type Sex = "man" | "woman";

export type User = {
  uid: string;
  name: string;
  photo: string | null;
  sex: Sex;
  lastSignInAt: Timestamp;
};

export type InputUser = {
  name: string;
  photo: string | null;
  sex: Sex;
};

const useUser = () => {
  const { getColRef, getDoc, getDocs, getDocRef, setDoc } = useFirestore();

  const userConverter: FirestoreDataConverter<User> = {
    toFirestore(u: User): DocumentData {
      return {
        name: u.name,
        photo: u.photo,
        sex: u.sex,
        lastSignInAt: u.lastSignInAt,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): User {
      const d = snapshot.data();
      return {
        uid: snapshot.id,
        name: d.name,
        photo: d.photo,
        sex: d.sex,
        lastSignInAt: d.lastSignInAt,
      };
    },
  };

  const collectionName = "users";

  const getUserDocRef = (userId: string): DocumentReference<User> => {
    return getDocRef(collectionName, userId, userConverter);
  };

  const getUserColRef = () => {
    return getColRef(collectionName, userConverter);
  };

  const getUserDoc = async (userId: string): Promise<User | null> => {
    const docRef = getUserDocRef(userId);
    return await getDoc(docRef);
  };

  const setUserDoc = async (userId: string, inputUser: InputUser) => {
    const docRef = getUserDocRef(userId);
    await setDoc(docRef, {
      uid: userId,
      ...inputUser,
      lastSignInAt: serverTimestamp(),
    });
  };

  const searchUserDocs = async (sex: Sex): Promise<User[]> => {
    const userColRef = getUserColRef();
    return await getDocs(userColRef, [
      where("sex", "==", sex),
      orderBy("lastSignInAt", "desc"),
      limit(10),
    ]);
  };

  return { getUserDoc, getUserDocRef, searchUserDocs, setUserDoc };
};

export default useUser;
