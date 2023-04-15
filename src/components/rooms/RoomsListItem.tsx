import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Room } from "../../hooks/useRoom";
import { useAppSelector } from "../../store/hooks";

type Props = {
  room: Room;
};

const RoomsListItem = ({ room }: Props) => {
  const authUid = useAppSelector((state) => state.auth.uid);
  const you = room.users.A.uid !== authUid ? room.users.A : room.users.B;

  return (
    <div className="rooms-list-item">
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/avatar.png" />
        </ListItemAvatar>
        <ListItemText primary={you.name} secondary={room.lastMessage} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default RoomsListItem;
