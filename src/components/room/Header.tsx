import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Phone } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
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
    navigate(`/room/${roomId}/phone?meUid=${me.uid}&youUid=${you.uid}`);
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
          <Avatar src={you.photo ?? "/avatar.png"} />
        </div>
        <div className="name-column">{you.name}</div>
        <div className="phone-column">
          <IconButton onClick={handleNavigatePhone}>
            <Phone fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
