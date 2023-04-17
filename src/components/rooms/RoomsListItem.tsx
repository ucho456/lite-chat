import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import "./RoomsListItem.scss";

type Props = {
  room: Room;
};

const RoomsListItem = ({ room }: Props) => {
  const authUid = useAppSelector((state) => state.auth.uid);
  const you =
    room.inviteeUser.uid !== authUid ? room.inviteeUser : room.invitedUser;

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
