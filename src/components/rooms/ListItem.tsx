import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Divider,
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import "./ListItem.scss";

type Props = {
  room: Room;
};

const ListItem = ({ room }: Props) => {
  const authUid = useAppSelector((state) => state.auth.uid);
  const you =
    room.inviteeUser.uid !== authUid ? room.inviteeUser : room.invitedUser;

  const navigate = useNavigate();
  const handleNavigateRoom = () => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <div className="rooms-list-item" onClick={handleNavigateRoom}>
      <MuiListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={you.name} src={you.photo ?? "/avatar.png"} />
        </ListItemAvatar>
        <ListItemText primary={you.name} secondary={room.lastMessage} />
      </MuiListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default ListItem;
