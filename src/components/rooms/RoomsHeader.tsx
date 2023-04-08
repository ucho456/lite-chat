import { Avatar, IconButton } from "@mui/material";
import "./RoomsHeader.scss";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { auth } from "../../firebase";
import { signOut } from "../../store/modules/authSlice";

const RoomsHeader = () => {
  const user = { name: "aa", photo: null };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    auth.signOut();
    dispatch(signOut());
    navigate("/");
  };

  return (
    <div className="rooms-header">
      <div className="container">
        <div className="photo-column">
          {user.photo ? (
            <Avatar src={user.photo} />
          ) : (
            <Avatar src="/avatar.png" />
          )}
        </div>
        <div className="name-column">{user.name}</div>
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
