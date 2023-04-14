import { Avatar, Dialog } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useUser, { InputUser } from "../../hooks/useUser";
import ProfileForm from "../commons/ProfileForm";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser } from "../../store/modules/userSlice";
import "./ProfileEditDialog.scss";

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
  useEffect(() => {
    if (user || !authUid) return;
    const setUserToStore = async () => {
      try {
        const user = await getUserDoc(authUid);
        dispatch(setUser(user));
      } catch (error: any) {
        alert(error.message);
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
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  if (!user) return <></>;
  return (
    <div className="profile-edit-dialog">
      <div className="user-column" onClick={handleOpen}>
        {user.photo ? (
          <Avatar src={user.photo} />
        ) : (
          <Avatar src="/avatar.png" />
        )}
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
