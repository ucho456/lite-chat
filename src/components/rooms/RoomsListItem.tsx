import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Room } from "../../hooks/useRoom";
import { useAppSelector } from "../../store/hooks";
import "./RoomsListItem.scss";
import { useNavigate } from "react-router-dom";

type Props = {
  room: Room;
};

const RoomsListItem = ({ room }: Props) => {
  const authUid = useAppSelector((state) => state.auth.uid);
  const you = room.users.A.uid !== authUid ? room.users.A : room.users.B;

  const navigate = useNavigate();
  const handlePushToRoom = () => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <div className="rooms-list-item" onClick={handlePushToRoom}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={you.name} src={you.photo ?? "/avatar.png"} />
        </ListItemAvatar>
        <ListItemText primary={you.name} secondary={room.lastMessage} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default RoomsListItem;
