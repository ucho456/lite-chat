import { useNavigate } from "react-router-dom";
import { useSnackbar } from "@/contexts/Snackbar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signOut } from "@/store/modules/authSlice";
import { resetUser } from "@/store/modules/userSlice";
import { auth } from "@/firebase";
import Header from "@/components/rooms/Header";
import List from "@/components/rooms/List";
import "./index.scss";

const Rooms = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /** SignOut */
  const { openSnackbar } = useSnackbar();
  const handleSignOut = (): void => {
    auth.signOut();
    dispatch(signOut());
    dispatch(resetUser());
    navigate("/");
    openSnackbar("サインアウトしました。", "success");
  };
  const rooms = useAppSelector((state) => state.rooms.rooms);
  return (
    <div className="rooms">
      <Header onClick={handleSignOut} />
      <div className="spacer" />
      <div className="list">
        <List rooms={rooms} />
      </div>
    </div>
  );
};

export default Rooms;
