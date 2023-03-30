import {
  Avatar,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { signInAnonymously } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db, functions } from "../../firebase";
import { userConverter } from "../../utils/converter";
import "./TopDialog.scss";

const TopDialog = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { control, handleSubmit } = useForm<InputUser>({
    shouldUnregister: false,
    defaultValues: { name: "", photo: null, sex: "man", youSex: "woman" },
  });

  const handleMatching: SubmitHandler<InputUser> = async (
    inputUser: InputUser
  ) => {
    try {
      const userCredential = await signInAnonymously(auth);
      const userRef = doc(db, "users", userCredential.user.uid).withConverter(
        userConverter
      );
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        name: inputUser.name,
        photo: inputUser.photo,
        sex: inputUser.sex,
        youSex: inputUser.youSex,
        waitingState: "waiting",
        waitingStartAt: serverTimestamp(),
        roomId: null,
      });

      // const matching = httpsCallable(functions, "matching");
      // const result = await matching();
      // alert(`ok: ${result}`);
      navigate("/room/4J3gRbhuM26WshKyENqW");
    } catch (error: any) {
      alert(`error: ${error.message}`);
    }
  };

  return (
    <div>
      <Button fullWidth size="large" variant="contained" onClick={handleOpen}>
        始める
      </Button>
      <Dialog className="top-dialog" open={open} onClose={handleClose}>
        <Stack component="form" onSubmit={handleSubmit(handleMatching)}>
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
              <Button size="large" type="submit" variant="contained">
                マッチングを開始する
              </Button>
            </div>
          </div>
        </Stack>
      </Dialog>
    </div>
  );
};

export default TopDialog;
