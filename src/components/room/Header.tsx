import { ChevronLeft, Phone } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import "./Header.scss";

type Props = {
  you: RoomUser;
  onClickLeave: () => void;
  onClickPhone: () => void;
};

const Header = ({ you, onClickLeave, onClickPhone }: Props) => {
  return (
    <div className="room-header">
      <div className="container">
        <div className="leave-column">
          <IconButton onClick={onClickLeave}>
            <ChevronLeft fontSize="large" />
          </IconButton>
        </div>
        <div className="photo-column">
          <Avatar src={you.photo ?? "/avatar.png"} />
        </div>
        <div className="name-column">{you.name}</div>
        <div className="phone-column">
          <IconButton onClick={onClickPhone}>
            <Phone fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
