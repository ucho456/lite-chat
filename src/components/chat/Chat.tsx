import { Button } from "@mui/material";
import "./Chat.scss";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { userConverter } from "../../utils/converter";
import { login } from "../../features/userSlice";

const Chat = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        const uRef = doc(db, "users", user.uid).withConverter(userConverter);
        const uSnap = await getDoc(uRef);
        if (uSnap.exists()) {
          const u = uSnap.data();
          dispatch(login({ uid: u.uid, name: u.name, photo: u.photo }));
        }
      };
      fetchUser();
    }
  }, [user]);

  const navigate = useNavigate();
  const signOut = () => {
    auth.signOut();
    navigate("/welcome");
  };
  return (
    <div>
      {user ? user.name : ""}
      <Button onClick={signOut}>ログアウト</Button>
    </div>
  );
};

export default Chat;
