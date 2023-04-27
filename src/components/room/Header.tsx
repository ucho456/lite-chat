import { useNavigate, useParams } from "react-router-dom";
import { Block, ChevronLeft, Phone } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSnackbar } from "@/contexts/Snackbar";
import { blockRoom } from "@/utils/firestore";
import DialogProfile from "@/components/commons/DialogProfile";
import "./Header.scss";

type Props = {
  me: RoomUser;
  you: RoomUser;
};

const Header = ({ me, you }: Props) => {
  /** Routing */
  const navigate = useNavigate();
  const handleNavigateRooms = (): void => navigate("/rooms");
  const { roomId } = useParams<{ roomId: string }>();
  const handleNavigatePhone = (): void => {
    const result = confirm(
      `${you.name}さんとビデオ電話で通話しますか？（相手がチャットルームにいないと通知されません。）`,
    );
    if (result) navigate(`/rooms/${roomId}/phone?caller=true`);
  };

  const { openSnackbar } = useSnackbar();
  const handleBlock = (): void => {
    if (!roomId) return;
    const result = confirm(`${you.name}さんをブロックしますか？`);
    if (result) {
      try {
        /** Exit the room before waiting for block results. */
        blockRoom(roomId, me.uid, you.uid);
        openSnackbar(`${you.name}さんをブロックしました。`, "success");
        handleNavigateRooms();
      } catch {
        openSnackbar("ブロックに失敗しました。", "error");
      }
    }
  };

  return (
    <div className="room-header">
      <div className="container">
        <div className="leave-column">
          <IconButton onClick={handleNavigateRooms}>
            <ChevronLeft fontSize="large" />
          </IconButton>
        </div>
        <div className="photo-column">
          <DialogProfile you={you} />
        </div>
        <div className="phone-column">
          <IconButton onClick={handleNavigatePhone}>
            <Phone fontSize="large" />
          </IconButton>
        </div>
        <div className="block-column">
          <IconButton onClick={handleBlock}>
            <Block fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
