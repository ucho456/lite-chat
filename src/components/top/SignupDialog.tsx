import { Button, Dialog } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase";
import useUser, { InputUser } from "../../hooks/useUser";
import ProfileForm from "../commons/ProfileForm";
import { LoadingButton } from "@mui/lab";

const SignupDialog = () => {
  const navigate = useNavigate();
  const { setUserDoc } = useUser();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { control, handleSubmit } = useForm<InputUser>({
    shouldUnregister: false,
    defaultValues: { name: "test", photo: null, sex: "man" },
  });

  const [loading, setLoading] = useState(false);
  const handleSignup: SubmitHandler<InputUser> = async (
    inputUser: InputUser
  ) => {
    try {
      setLoading(true);
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      await setUserDoc(userCredential.user.uid, inputUser);
      navigate("/rooms");
    } catch (error: any) {
      alert(error.message);
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

export default SignupDialog;
