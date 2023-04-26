import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Button, Dialog } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { useSnackbar } from "@/contexts/Snackbar";
import useUser from "@/hooks/useUser";
import { useAppDispatch } from "@/store/hooks";
import { signIn } from "@/store/modules/authSlice";
import { createUser } from "@/utils/firestore";
import { auth, googleAuthProvider } from "@/firebase";
import ProfileForm from "@/components/commons/ProfileForm";

const DialogSignup = () => {
  /** Dialog switch */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /** User form */
  const { control, handleSubmit } = useForm<InputUser>({
    shouldUnregister: false,
    defaultValues: {
      name: "",
      photo: null,
      sex: "man",
      era: "early 20's",
      selfIntroduction: "",
    },
  });

  /** Sign up */
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { getUserDoc } = useUser();
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleSignup: SubmitHandler<InputUser> = async (
    inputUser: InputUser,
  ) => {
    try {
      setLoading(true);
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      dispatch(signIn(userCredential.user.uid));
      const user = await getUserDoc(userCredential.user.uid);
      if (user) {
        openSnackbar("サインインしました。", "success");
      } else {
        await createUser({
          uid: userCredential.user.uid,
          ...inputUser,
          life: 3,
          roomCount: 0,
          blocks: [],
        });
        openSnackbar("サインアップしました。", "success");
      }
      navigate("/rooms");
    } catch {
      openSnackbar("サインアップに失敗しました。", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button fullWidth size="large" variant="contained" onClick={handleOpen}>
        新規登録
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <ProfileForm
          control={control}
          handleFunction={handleSignup}
          handleSubmit={handleSubmit}
        >
          <LoadingButton
            style={{ backgroundColor: "#4285f4", textTransform: "none" }}
            loading={loading}
            startIcon={<img src="/google_icon.png" />}
            size="large"
            type="submit"
            variant="contained"
          >
            Googleアカウントで新規登録
          </LoadingButton>
        </ProfileForm>
      </Dialog>
    </>
  );
};

export default DialogSignup;
