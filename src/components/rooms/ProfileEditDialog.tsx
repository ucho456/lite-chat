import { Avatar, Dialog } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ProfileForm from "../commons/ProfileForm";
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from "../../store/hooks";
import "./ProfileEditDialog.scss";
import { useSnackbar } from "../../contexts/Snackbar";
import { updateUser } from "../../utils/writeToFirestore";

const ProfileEditDialog = () => {
  /** Dialog switch */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /** Set default values asynchronously */
  const user = useAppSelector((state) => state.user.user);
  const { control, handleSubmit, reset } = useForm<InputUser>({
    shouldUnregister: false,
    defaultValues: useMemo(() => {
      if (!user) return;
      return {
        name: user.name,
        photo: user.photo,
        sex: user.sex,
      };
    }, [user]),
  });
  useEffect(() => {
    if (!user) return;
    reset(user);
  }, [user]);

  /** Update user profile */
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const handleUpdateUser: SubmitHandler<InputUser> = async (
    inputUser: InputUser
  ) => {
    if (!user) return;
    try {
      setLoading(true);
      await updateUser({ ...user, ...inputUser });
      openSnackbar("プロフィールを更新しました。", "success");
    } catch (error: any) {
      openSnackbar("プロフィールの更新に失敗しました。", "error");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  if (!user) return <></>;
  return (
    <div className="profile-edit-dialog">
      <div className="user-column" onClick={handleOpen}>
        <Avatar src={user.photo ?? "/avatar.png"} />
        <div className="name">{user.name}</div>
      </div>
      <Dialog className="profile-edit-dialog" open={open} onClose={handleClose}>
        <ProfileForm
          control={control}
          handleFunction={handleUpdateUser}
          handleSubmit={handleSubmit}
        >
          <LoadingButton
            loading={loading}
            size="large"
            type="submit"
            variant="contained"
          >
            プロフィールを更新
          </LoadingButton>
        </ProfileForm>
      </Dialog>
    </div>
  );
};

export default ProfileEditDialog;
