import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateUser } from "../../features/userSlice";
import { doc, getDoc } from "firebase/firestore";
import { userConverter } from "../../utils/converter";

const ChatDialog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  //Todo: useEffectでroomがnullになったらtrueにしてDialogを出す。

  const handleSignOut = () => {
    auth.signOut();
    navigate("/welcome");
  };

  /** Form */
  const { control, handleSubmit, setValue } = useForm<InputUser>({
    shouldUnregister: false,
    defaultValues: { name: "", photo: "" },
  });

  const validationRules = {
    name: {
      required: "名前を入力してください。",
    },
  };

  const uid = useAppSelector((state) => state.auth.uid);
  useEffect(() => {
    if (uid) {
      const fetchUser = async () => {
        const userRef = doc(db, "users", uid).withConverter(userConverter);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const user = userSnap.data();
          setValue("name", user.name);
          setValue("photo", user.photo);
        }
      };
      fetchUser();
    }
  });

  const handleStart: SubmitHandler<InputUser> = (inputUser: InputUser) => {
    if (!uid) {
      return;
    }
    //Todo: photoの入力フォームを作成する。
    dispatch(updateUser({ uid, ...inputUser, photo: "" }));
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open}>
        <Stack component="form" noValidate onSubmit={handleSubmit(handleStart)}>
          <DialogContent>
            <DialogContentText>
              あなたのプロフィールと相手の条件を入力して開始して下さい。
            </DialogContentText>
            <Controller
              control={control}
              name="name"
              rules={validationRules.name}
              render={({ field, fieldState }) => (
                <TextField
                  error={fieldState.invalid}
                  {...field}
                  fullWidth
                  helperText={fieldState.error?.message}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 10 }}
                  label="あなたのニックネーム"
                  margin="normal"
                  size="small"
                  type="text"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSignOut}>サインアウト</Button>
            <Button type="submit">開始する</Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
};

export default ChatDialog;
