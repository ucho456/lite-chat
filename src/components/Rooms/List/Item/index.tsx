import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Divider,
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { ItemStyled } from "@/components/Rooms/List/Item/styled";
import { useAppSelector } from "@/store/hooks";

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
    <ItemStyled onClick={handleNavigateRoom}>
      <MuiListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={you.name} src={you.photo ?? "/images/avatar.webp"} />
        </ListItemAvatar>
        <ListItemText
          primary={you.name}
          secondary={
            <span style={{ display: "flex" }}>
              <span
                style={{
                  height: "20px",
                  lineHeight: "20px",
                  fontSize: "5px",
                  color: "orange",
                  marginRight: `${me.unread ? "5px" : "0px"}`,
                }}
              >
                {me.unread ? "●" : ""}
              </span>
              <span style={{ color: "gray" }}>{room.lastMessage}</span>
            </span>
          }
        />
      </MuiListItem>
      <Divider variant="inset" component="li" />
    </ItemStyled>
  );
};

export default ListItem;
