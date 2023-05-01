import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Avatar, Dialog } from "@mui/material";
import { useSnackbar } from "@/contexts/Snackbar";
import { useAppSelector } from "@/store/hooks";
import { updateUser } from "@/utils/firestore";
import { uploadImageAndGetUrl } from "@/utils/storage";
import ProfileForm from "@/components/commons/ProfileForm";
import "./DialogProfileEdit.scss";

const DialogProfileEdit = () => {
  /** Dialog switch */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /** User form */
  const user = useAppSelector((state) => state.user.user);
  const [inputUser, setInputUser] = useState<InputUser>({
    name: "",
    photo: null,
    sex: "man",
    era: "early 20's",
    selfIntroduction: "",
  });
  useEffect(() => {
    if (!user) return;
    setInputUser({
      name: user.name,
      photo: user.photo,
      sex: user.sex,
      era: user.era,
      selfIntroduction: user.selfIntroduction,
    });
  }, [user]);

  /** Update user profile */
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const handleUpdateUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    e.preventDefault();
    if (!user) return;
    try {
      setLoading(true);
      if (inputUser.photo && !inputUser.photo.match("^https?://.+$")) {
        inputUser.photo = await uploadImageAndGetUrl(
          `users/${user.uid}`,
          inputUser.photo,
        );
      }
      await updateUser({ ...user, ...inputUser });
      openSnackbar("プロフィールを更新しました。", "success");
    } catch {
      openSnackbar("プロフィールの更新に失敗しました。", "error");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  if (!user) return <></>;
  return (
    <div className="dialog-profile-edit">
      <div className="user-column" onClick={handleOpen}>
        <Avatar src={user.photo ?? "/avatar.webp"} />
        <div className="name">{user.name}</div>
      </div>
      <Dialog className="dialog-profile-edit" open={open} onClose={handleClose}>
        <ProfileForm inputUser={inputUser} setInputUser={setInputUser} />
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
          <LoadingButton
            loading={loading}
            size="large"
            type="submit"
            variant="contained"
            onClick={handleUpdateUser}
          >
            プロフィールを更新
          </LoadingButton>
        </div>
      </Dialog>
    </div>
  );
};

export default DialogProfileEdit;
