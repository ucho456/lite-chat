import { IconButton } from "@mui/material";
import "./RoomsHeader.scss";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { auth } from "../../firebase";
import { signOut } from "../../store/modules/authSlice";
import ProfileEditDialog from "./ProfileEditDialog";
import { resetUser } from "../../store/modules/userSlice";
import { useSnackbar } from "../../contexts/Snackbar";

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
