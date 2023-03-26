import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateUser } from "../../features/userSlice";
import { doc, getDoc } from "firebase/firestore";
import { userConverter } from "../../utils/converter";

const ChatDialog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const { handleSubmit, register, reset, setValue } = useForm<InputUser>({
    shouldUnregister: false,
  });

  const uid = useAppSelector((state) => state.auth.uid);
  useEffect(() => {
    if (uid) {
      const fetchUser = async () => {
        const userRef = doc(db, "users", uid).withConverter(userConverter);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const user = userSnap.data();
          dispatch(updateUser(user));
          setValue("name", user.name);
          setValue("photo", user.photo);
        }
      };
      fetchUser();
    }
  });

  const handleStart = (inputUser: InputUser) => {
    if (!uid) {
      return;
    }
    //Todo: photoの入力フォームを作成する。
    dispatch(updateUser({ uid, ...inputUser, photo: "" }));
    reset();
    setOpen(false);
  };

  //Todo: useEffectでroomがnullになったらtrueにしてDialogを出す。

  const handleSignOut = () => {
    auth.signOut();
    navigate("/welcome");
  };

  return (
    <div>
      <Dialog open={open}>
        <form onSubmit={handleSubmit(handleStart)}>
          <DialogContent>
            <DialogContentText>
              あなたのプロフィールと相手の条件を入力して開始して下さい。
            </DialogContentText>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ maxLength: 10 }}
              label="あなたのニックネーム"
              margin="dense"
              {...register("name")}
              required
              size="small"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSignOut}>サインアウト</Button>
            <Button type="submit">開始する</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ChatDialog;
