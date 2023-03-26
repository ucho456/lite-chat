import "./Chat.scss";
import { db } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { userConverter } from "../../utils/converter";
import { updateUser } from "../../features/userSlice";
import ChatDialog from "./ChatDialog";

const Chat = () => {
  const uid = useAppSelector((state) => state.auth.uid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uid) {
      const fetchUser = async () => {
        const userRef = doc(db, "users", uid).withConverter(userConverter);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const user = userSnap.data();
          dispatch(updateUser(user));
        }
      };
      fetchUser();
    }
  }, [uid]);

  return (
    <div>
      <ChatDialog />
    </div>
  );
};

export default Chat;
