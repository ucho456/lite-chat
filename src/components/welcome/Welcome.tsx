import { useEffect } from "react";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import "./Welcome.scss";
import { useAppDispatch } from "../../app/hooks";
import { login, logout } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            name: loginUser.displayName,
            photo: loginUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const signIn = async () => {
    await signInWithPopup(auth, provider).catch((err) => {
      alert(err.message);
    });
    navigate("/");
  };

  return (
    <div>
      <Button onClick={signIn}>始める</Button>
    </div>
  );
};

export default Welcome;
