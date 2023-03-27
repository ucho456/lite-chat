import { useEffect } from "react";
import {
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
import { auth, db } from "../../firebase";
import "./Welcome.scss";
import { useAppDispatch } from "../../app/hooks";
import { signIn, signOut } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { userConverter } from "../../utils/converter";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const Welcome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, setValue } = useForm<InputUser>({
    shouldUnregister: false,
    defaultValues: { name: "", photo: "", sex: "man" },
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loginUser) => {
      loginUser ? dispatch(signIn(loginUser.uid)) : dispatch(signOut());
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const handleStart: SubmitHandler<InputUser> = async (
    inputUser: InputUser
  ) => {
    alert(inputUser.name);
    // try {
    //   const userCredential = await signInAnonymously(auth);
    //   const userRef = doc(db, "users", userCredential.user.uid).withConverter(
    //     userConverter
    //   );
    //   await setDoc(userRef, {
    //     name: "test user",
    //     photo: null,
    //     sex: "man",
    //     waitingState: "waiting",
    //     waitingStartAt: serverTimestamp(),
    //     roomId: null,
    //   });
    // } catch (error: any) {
    //   alert(error.message);
    // }
    // navigate("/");
  };

  return (
    <div className="welcome">
      <div className="container">
        <div className="logo-row">ろご</div>
        <div className="discription-row">
          <h2></h2>
          <p>登録・インストール不要で気軽に繋がるチャットサービスです。</p>
        </div>
        <Stack
          className="form-row"
          component="form"
          onSubmit={handleSubmit(handleStart)}
        >
          <div className="container">
            <div className="me-row">
              <h3>- あなたのプロフィール -</h3>
              <div className="container">
                <div className="photo-column">写真</div>
                <div className="name-column">
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ maxLength: 10 }}
                        label="ニックネーム"
                        size="small"
                        type="text"
                      />
                    )}
                  />
                </div>
                <div className="sex-column">
                  <Controller
                    control={control}
                    name="sex"
                    render={({ field }) => (
                      <FormControl>
                        <InputLabel id="me-sex-label">性別</InputLabel>
                        <Select
                          {...field}
                          fullWidth
                          label="性別"
                          labelId="me-sex-label"
                          size="small"
                        >
                          <MenuItem value={"man"}>男性</MenuItem>
                          <MenuItem value={"woman"}>女性</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="you-row">
              <h3>- あいての条件 -</h3>
            </div>
            <div className="button-row">
              <Button fullWidth type="submit">
                開始する
              </Button>
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default Welcome;
