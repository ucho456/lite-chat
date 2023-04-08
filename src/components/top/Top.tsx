import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { signInAnonymously } from "firebase/auth";
import { auth, db, functions } from "../../firebase";
import "./Top.scss";
import { useAppDispatch } from "../../store/hooks";
import { signIn, signOut } from "../../store/modules/authSlice";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { userConverter } from "../../utils/converter";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { httpsCallable } from "firebase/functions";
import TopDialog from "./TopDialog";

const Top = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, setValue } = useForm<InputUser>({
    shouldUnregister: false,
    defaultValues: { name: "", photo: "", sex: "man", youSex: "woman" },
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loginUser) => {
      loginUser ? dispatch(signIn(loginUser.uid)) : dispatch(signOut());
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  // const [open, setOpen] = useState<boolean>(false);
  const handleStart: SubmitHandler<InputUser> = async (
    inputUser: InputUser
  ) => {
    try {
      // const userCredential = await signInAnonymously(auth);
      // const userRef = doc(db, "users", userCredential.user.uid).withConverter(
      //   userConverter
      // );
      // await setDoc(userRef, {
      //   uid: userCredential.user.uid,
      //   name: "test user",
      //   photo: null,
      //   sex: "man",
      //   youSex: "woman",
      //   waitingState: "waiting",
      //   waitingStartAt: serverTimestamp(),
      //   roomId: null,
      // });
      // const matching = httpsCallable(functions, "matching");
      // const result = await matching();
      // alert(`ok: ${result}`);
    } catch (error: any) {
      alert(`error: ${error.message}`);
    }
    navigate("/room/4J3gRbhuM26WshKyENqW");
  };

  return (
    <div className="top">
      <div className="container">
        <div className="logo-row">
          <img src="/logo.png" />
        </div>
        <div className="discription-row">
          <p>
            登録・インストール不要。チャットや通話を気軽に楽しめるサービスです。さぁ始めましょう！
          </p>
        </div>
        <TopDialog />
      </div>
    </div>
  );
};

export default Top;
