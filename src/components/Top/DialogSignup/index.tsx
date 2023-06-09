import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Button, Checkbox, Dialog } from "@mui/material";
import { signInAnonymously } from "firebase/auth";
import ProfileForm from "@/components/commons/ProfileForm";
import DialogTermsOfService from "@/components/Top/DialogTermsOfService";
import { useSnackbar } from "@/contexts/Snackbar";
import useUser from "@/hooks/useUser";
import { useAppDispatch } from "@/store/hooks";
import { signIn } from "@/store/modules/authSlice";
import { createUser } from "@/utils/firestore";
import { uploadImageAndGetUrl } from "@/utils/storage";
import { auth } from "@/firebase";

type Props = {
  buttonText?: string;
};

const DialogSignup = memo(({ buttonText = "お試しで開始" }: Props) => {
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
      const userCredential = await signInAnonymously(auth);
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
        {buttonText}
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
              style={{ width: "90%" }}
              loading={loading}
              size="large"
              type="submit"
              variant="contained"
              fullWidth
            >
              開始する
            </LoadingButton>
          </div>
        </form>
      </Dialog>
    </>
  );
});

DialogSignup.displayName = "DialogSignup";

export default DialogSignup;
