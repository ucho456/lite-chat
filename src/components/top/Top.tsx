import { useEffect } from "react";
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
import { auth, db } from "../../firebase";
import "./Top.scss";
import { useAppDispatch } from "../../app/hooks";
import { signIn, signOut } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { userConverter } from "../../utils/converter";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

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

  const handleStart: SubmitHandler<InputUser> = async (
    inputUser: InputUser
  ) => {
    try {
      const userCredential = await signInAnonymously(auth);
      // const userRef = doc(db, "users", userCredential.user.uid).withConverter(
      //   userConverter
      // );
      // await setDoc(userRef, {
      //   name: "test user",
      //   photo: null,
      //   sex: "man",
      //   waitingState: "waiting",
      //   waitingStartAt: serverTimestamp(),
      //   roomId: null,
      // });
    } catch (error: any) {
      alert(error.message);
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
        <Stack
          className="form-row"
          component="form"
          onSubmit={handleSubmit(handleStart)}
        >
          <div className="container">
            <div className="me-row">
              <h3>- あなたのプロフィール -</h3>
              <div className="container">
                <div className="photo-column">
                  <Avatar
                    className="photo"
                    src="/avatar.png"
                    sx={{ width: 110, height: 110 }}
                  />
                </div>
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
                        //[Todo: 開発用] 入力が面倒なので。後々requiredを復活させる予定。
                        // required
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
              <Controller
                control={control}
                name="youSex"
                render={({ field }) => (
                  <FormControl>
                    <InputLabel id="you-sex-label">性別</InputLabel>
                    <Select
                      {...field}
                      fullWidth
                      label="性別"
                      labelId="you-sex-label"
                      size="small"
                    >
                      <MenuItem value={"man"}>男性</MenuItem>
                      <MenuItem value={"woman"}>女性</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </div>
            <div className="button-row">
              <Button fullWidth size="large" type="submit" variant="contained">
                開始する
              </Button>
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default Top;
