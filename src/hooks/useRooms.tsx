import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { db } from "../firebase";
import { setRooms } from "../store/modules/roomsSlice";
import { roomConverter } from "../utils/converters";

const useRooms = () => {
  const authUid = useAppSelector((state) => state.auth.uid);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const colRef = collection(db, "rooms").withConverter(roomConverter);
    const q = query(
      colRef,
      where("isBlock", "==", false),
      where("userUids", "array-contains", authUid),
      orderBy("lastActionAt", "desc"),
      limit(30)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _rooms: Room[] = [];
      querySnapshot.forEach((doc) => _rooms.push(doc.data()));
      dispatch(setRooms(_rooms));
    });
    return () => unsubscribe();
  }, [authUid]);
};

export default useRooms;
