import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateUser } from "../../features/userSlice";

const ChatDialog = () => {
  const [open, setOpen] = useState(true);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const { handleSubmit, register, reset } = useForm<InputUser>({
    defaultValues: {
      name: user?.name,
      photo: user?.photo,
    },
  });

  const handleStart = (inputUser: InputUser) => {
    if (!user) {
      return;
    }
    //Todo: photoの入力フォームを作成する。
    dispatch(updateUser({ uid: user.uid, ...inputUser, photo: "" }));
    reset();
    setOpen(false);
  };

  //Todo: useEffectでroomがnullになったらtrueにしてDialogを出す。

  const navigate = useNavigate();
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
              margin="dense"
              id="name"
              label="あなたのニックネーム"
              type="text"
              fullWidth
              {...register("name")}
              variant="standard"
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
