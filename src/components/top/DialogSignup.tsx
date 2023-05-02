import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Button, Checkbox, Dialog } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { useSnackbar } from "@/contexts/Snackbar";
import useUser from "@/hooks/useUser";
import { useAppDispatch } from "@/store/hooks";
import { signIn } from "@/store/modules/authSlice";
import { createUser } from "@/utils/firestore";
import { uploadImageAndGetUrl } from "@/utils/storage";
import { auth, googleAuthProvider } from "@/firebase";
import ProfileForm from "@/components/commons/ProfileForm";
import DialogTermsOfService from "@/components/top/DialogTermsOfService";

const DialogSignup = () => {
  /** Dialog switch */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /** User form */
  const [inputUser, setInputUser] = useState<InputUser>({
    name: "",
    photo: null,
    sex: "man",
    era: "early 20's",
    selfIntroduction: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  /** Sign up */
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { getUserDoc } = useUser();
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      const uid = userCredential.user.uid;
      dispatch(signIn(uid));
      const user = await getUserDoc(uid);
      if (user) {
        openSnackbar("サインインしました。", "success");
      } else {
        if (inputUser.photo && !inputUser.photo.match("^https?://.+$")) {
          inputUser.photo = await uploadImageAndGetUrl(
            `users/${uid}`,
            inputUser.photo,
          );
        }
        await createUser({
          uid: uid,
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
        サインアップ
      </Button>
      <Dialog className="dialog-signup" open={open} onClose={handleClose}>
        <form onSubmit={handleSignup} style={{ maxWidth: "350px" }}>
          <ProfileForm inputUser={inputUser} setInputUser={setInputUser} />
          <div style={{ textAlign: "center" }}>
            <Checkbox
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <DialogTermsOfService />
          </div>
          <div style={{ marginBottom: "30px", textAlign: "center" }}>
            <LoadingButton
              className="submit-button"
              disabled={!isChecked}
              style={{ backgroundColor: "#4285f4", textTransform: "none" }}
              loading={loading}
              startIcon={<img src="/images/google_icon.webp" />}
              size="large"
              type="submit"
              variant="contained"
            >
              Googleアカウントでサインアップ
            </LoadingButton>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default DialogSignup;
