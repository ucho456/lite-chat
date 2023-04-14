import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const RoomsList = () => {
  return (
    <List sx={{ margin: "0 auto", width: "96%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText primary="Brunch this weekend?" secondary="aaa" />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default RoomsList;
