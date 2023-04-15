import { Avatar, Dialog } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useUser, { InputUser } from "../../hooks/useUser";
import ProfileForm from "../commons/ProfileForm";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser } from "../../store/modules/userSlice";
import "./ProfileEditDialog.scss";
import { useSnackbar } from "../../contexts/Snackbar";

const ProfileEditDialog = () => {
  /** Dialog switch */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /** Set user to store */
  const user = useAppSelector((state) => state.user.user);
  const authUid = useAppSelector((state) => state.auth.uid);
  const dispatch = useAppDispatch();
  const { getUserDoc, setUserDoc } = useUser();
  const { openSnackbar } = useSnackbar();
  useEffect(() => {
    if (user || !authUid) return;
    const setUserToStore = async () => {
      try {
        const user = await getUserDoc(authUid);
        dispatch(setUser(user));
      } catch (error: any) {
        openSnackbar("ユーザー情報の取得に失敗しました。", "error");
      }
    };
    setUserToStore();
  }, [authUid]);

  /** Set default values asynchronously */
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
  const handleUpdateUser: SubmitHandler<InputUser> = async (
    inputUser: InputUser
  ) => {
    if (!authUid) return;
    try {
      setLoading(true);
      await setUserDoc(authUid, inputUser);
      dispatch(setUser({ uid: authUid, ...inputUser }));
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
