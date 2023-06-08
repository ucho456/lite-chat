import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import DialogProfileEdit from "@/components/Rooms/DialogProfileEdit";
import { RoomsHeaderStyled } from "@/components/Rooms/Header/styled";
import { useSnackbar } from "@/contexts/Snackbar";
import { useAppDispatch } from "@/store/hooks";
import { signOut } from "@/store/modules/authSlice";
import { resetUser } from "@/store/modules/userSlice";
import { auth } from "@/firebase";

const Header = () => {
  /** SignOut */
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const handleSignOut = (): void => {
    auth.signOut();
    dispatch(signOut());
    dispatch(resetUser());
    navigate("/");
    openSnackbar("サインアウトしました。", "success");
  };

  return (
    <RoomsHeaderStyled>
      <div className="container">
        <div className="user-column">
          <DialogProfileEdit />
        </div>
        <div className="leave-column">
          <IconButton onClick={handleSignOut}>
            <Logout fontSize="large" />
          </IconButton>
        </div>
      </div>
    </RoomsHeaderStyled>
  );
};

export default Header;
