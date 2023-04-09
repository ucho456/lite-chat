import { Avatar, IconButton } from "@mui/material";
import "./RoomsHeader.scss";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { auth } from "../../firebase";
import { signOut } from "../../store/modules/authSlice";
import { useEffect } from "react";
import { setUserAsync } from "../../store/modules/userSlice";

const RoomsHeader = () => {
  const user = useAppSelector((state) => state.user.user);
  const authUid = useAppSelector((state) => state.auth.uid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user || !authUid) return;
    dispatch(setUserAsync({ authUid }));
  }, [authUid]);

  const navigate = useNavigate();
  const handleSignOut = () => {
    auth.signOut();
    dispatch(signOut());
    navigate("/");
  };

  if (!user) return <></>;
  return (
    <div className="rooms-header">
      <div className="container">
        <div className="user-column">
          {user.photo ? (
            <Avatar src={user.photo} />
          ) : (
            <Avatar src="/avatar.png" />
          )}
          <div className="name">{user.name}</div>
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
