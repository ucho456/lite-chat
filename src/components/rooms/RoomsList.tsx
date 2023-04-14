import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import UserSearchDialog from "./UserSearchDialog";
import "./RoomsList.scss";

const RoomsList = () => {
  return (
    <List
      className="rooms-list"
      sx={{ margin: "0 auto", width: "96%", bgcolor: "background.paper" }}
    >
      <div className="button">
        <UserSearchDialog />
      </div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/avatar.png" />
        </ListItemAvatar>
        <ListItemText primary="Brunch this weekend?" secondary="aaa" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/avatar.png" />
        </ListItemAvatar>
        <ListItemText primary="Brunch this weekend?" secondary="aaa" />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default RoomsList;
