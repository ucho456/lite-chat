import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSnackbar } from "@/contexts/Snackbar";
import { useAppDispatch } from "@/store/hooks";
import { signOut } from "@/store/modules/authSlice";
import { resetUser } from "@/store/modules/userSlice";
import { auth } from "@/firebase";
import ProfileEditDialog from "@/components/rooms/ProfileEditDialog";
import "./RoomsHeader.scss";

const RoomsHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { openSnackbar } = useSnackbar();
  const handleSignOut = () => {
    auth.signOut();
    dispatch(signOut());
    dispatch(resetUser());
    navigate("/");
    openSnackbar("サインアウトしました。", "success");
  };

  return (
    <div className="rooms-header">
      <div className="container">
        <div className="user-column">
          <ProfileEditDialog />
        </div>
        <div className="leave-column">
          <IconButton onClick={() => handleSignOut()}>
            <Logout fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default RoomsHeader;
