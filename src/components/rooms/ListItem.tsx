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
  let me, you;
  if (room.inviteeUser.uid === authUid) {
    me = room.inviteeUser;
    you = room.invitedUser;
  } else {
    me = room.invitedUser;
    you = room.inviteeUser;
  }

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
        <ListItemText
          primary={you.name}
          secondary={
            <p style={{ display: "flex" }}>
              <div
                style={{
                  height: "20px",
                  lineHeight: "20px",
                  fontSize: "5px",
                  color: "orange",
                  marginRight: `${me.unread ? "5px" : "0px"}`,
                }}
              >
                {me.unread ? "●" : ""}
              </div>
              <div style={{ color: "gray" }}>{room.lastMessage}</div>
            </p>
          }
        />
      </MuiListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default ListItem;
