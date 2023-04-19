import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Avatar, Dialog } from "@mui/material";
import { useSnackbar } from "@/contexts/Snackbar";
import { useAppSelector } from "@/store/hooks";
import { updateUser } from "@/utils/writeToFirestore";
import ProfileForm from "@/components/commons/ProfileForm";
import "./DialogProfileEdit.scss";

const DialogProfileEdit = () => {
  /** Dialog switch */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /** User form */
  const user = useAppSelector((state) => state.user.user);
  const { control, handleSubmit, reset } = useForm<InputUser>({
    shouldUnregister: false,
    defaultValues: useMemo(() => {
      if (!user) return;
      return {
        name: user.name,
        photo: user.photo,
        sex: user.sex,
        era: user.era,
        selfIntroduction: user.selfIntroduction,
      };
    }, [user]),
  });
  useEffect(() => {
    if (!user) return;
    reset(user);
  }, [user, reset]);

  /** Update user profile */
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const handleUpdateUser: SubmitHandler<InputUser> = async (
    inputUser: InputUser,
  ) => {
    if (!user) return;
    try {
      setLoading(true);
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
        <Avatar src={user.photo ?? "/avatar.png"} />
        <div className="name">{user.name}</div>
      </div>
      <Dialog className="dialog-profile-edit" open={open} onClose={handleClose}>
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

export default DialogProfileEdit;
