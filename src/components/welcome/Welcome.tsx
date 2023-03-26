import { useEffect } from "react";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import "./Welcome.scss";
import { useAppDispatch } from "../../app/hooks";
import { signIn, signOut } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

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

  const handleSignIn = async () => {
    await signInWithPopup(auth, provider).catch((err) => {
      alert(err.message);
    });
    navigate("/");
  };

  return (
    <div>
      <Button onClick={handleSignIn}>始める</Button>
    </div>
  );
};

export default Welcome;
