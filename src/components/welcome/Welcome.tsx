import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { signInAnonymously } from "firebase/auth";
import { auth, db } from "../../firebase";
import "./Welcome.scss";
import { useAppDispatch } from "../../app/hooks";
import { signIn, signOut } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { userConverter } from "../../utils/converter";

const Welcome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loginUser) => {
      loginUser ? dispatch(signIn(loginUser.uid)) : dispatch(signOut());
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const handleStart = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      const userRef = doc(db, "users", userCredential.user.uid).withConverter(
        userConverter
      );
      await setDoc(userRef, {
        name: "test user",
        photo: null,
        sex: "man",
        waitingState: "waiting",
        waitingStartAt: serverTimestamp(),
        roomId: null,
      });
    } catch (error: any) {
      alert(error.message);
    }
    navigate("/");
  };

  return (
    <div className="welcome">
      <div className="container">
        <div className="logo-row">ろご</div>
        <div className="discription-row">説明</div>
        <div className="me-row">あなた</div>
        <div className="you-row">あいて</div>
        <div className="button-row">
          <Button fullWidth onClick={handleStart}>
            開始する
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
