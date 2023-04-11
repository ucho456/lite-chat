import { IconButton } from "@mui/material";
import "./RoomsHeader.scss";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { auth } from "../../firebase";
import { signOut } from "../../store/modules/authSlice";
import RoomsProfileEditDialog from "./RoomsProfileEditDialog";
import { resetUser } from "../../store/modules/userSlice";

const RoomsHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut();
    dispatch(signOut());
    dispatch(resetUser());
    navigate("/");
  };

  return (
    <div className="rooms-header">
      <div className="container">
        <div className="user-column">
          <RoomsProfileEditDialog />
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
