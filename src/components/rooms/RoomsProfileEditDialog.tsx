import { Avatar, Dialog } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useUser, { InputUser } from "../../hooks/useUser";
import ProfileForm from "../commons/ProfileForm";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserAsync } from "../../store/modules/userSlice";
import "./RoomsProfileEditDialog.scss";

const RoomsProfileEditDialog = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useAppSelector((state) => state.user.user);
  const authUid = useAppSelector((state) => state.auth.uid);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user || !authUid) return;
    dispatch(setUserAsync({ authUid }));
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

  const {} = useUser();
  const [loading, setLoading] = useState(false);
  const handleUpdateUser: SubmitHandler<InputUser> = async (
    inputUser: InputUser
  ) => {
    try {
      alert("handleUpdateUser");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <></>;
  return (
    <div className="rooms-profile-edit-dialog">
      <div className="user-column" onClick={handleOpen}>
        {user.photo ? (
          <Avatar src={user.photo} />
        ) : (
          <Avatar src="/avatar.png" />
        )}
        <div className="name">{user.name}</div>
      </div>
      <Dialog
        className="rooms-profile-edit-dialog"
        open={open}
        onClose={handleClose}
      >
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

export default RoomsProfileEditDialog;
