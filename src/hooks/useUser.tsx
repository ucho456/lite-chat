import { useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetUser, setUser } from "@/store/modules/userSlice";
import { MATCH_LIMIT } from "@/utils/constants";
import { userConverter } from "@/utils/converters";
import { db } from "@/firebase";

const useUser = () => {
  const authUid = useAppSelector((state) => state.auth.uid);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!authUid) {
      dispatch(resetUser());
      return;
    }
    const docRef = doc(db, "users", authUid).withConverter(userConverter);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) dispatch(setUser(doc.data()));
    });
    return () => unsubscribe();
  }, [authUid, dispatch]);

  const getUserDoc = async (userId: string): Promise<User | null> => {
    const docRef = doc(db, "users", userId).withConverter(userConverter);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  };

  const getRandomUserDocs = async (condition: Condition): Promise<User[]> => {
    const { era, sex } = condition;
    const colRef = collection(db, "users").withConverter(userConverter);
    const q = query(
      colRef,
      where("era", "==", era),
      where("sex", "==", sex),
      where("roomCount", "<", MATCH_LIMIT),
      orderBy("roomCount", "asc"),
      orderBy("lastActionAt", "desc"),
      limit(10),
    );
    const snapshot = await getDocs(q);
    const users: User[] = [];
    snapshot.forEach((doc) => users.push(doc.data()));
    return users;
  };

  return { getUserDoc, getRandomUserDocs };
};

export default useUser;
