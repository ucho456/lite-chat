import { Logout } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import DialogProfileEdit from "@/components/rooms/DialogProfileEdit";
import "./Header.scss";

type Props = {
  onClick: () => void;
};

const Header = ({ onClick }: Props) => {
  return (
    <div className="rooms-header">
      <div className="container">
        <div className="user-column">
          <DialogProfileEdit />
        </div>
        <div className="leave-column">
          <IconButton onClick={onClick}>
            <Logout fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
