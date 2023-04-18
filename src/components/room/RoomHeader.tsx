import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Phone } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import "./RoomHeader.scss";

type Props = {
  me: RoomUser;
  you: RoomUser;
};

const RoomHeader = ({ me, you }: Props) => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const handleLeave = () => {
    navigate("/rooms");
  };
  const handlePhone = () => {
    if (!me || !you) return;
    navigate(`/room/${roomId}/phone?meUid=${me.uid}&youUid=${you.uid}`);
  };
  return (
    <div className="room-header">
      <div className="container">
        <div className="leave-column">
          <IconButton onClick={handleLeave}>
            <ChevronLeft fontSize="large" />
          </IconButton>
        </div>
        <div className="photo-column">
          <Avatar src={you.photo ?? "/avatar.png"} />
        </div>
        <div className="name-column">{you.name}</div>
        <div className="phone-column">
          <IconButton onClick={handlePhone}>
            <Phone fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default RoomHeader;
