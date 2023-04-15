import { List } from "@mui/material";
import UserSearchDialog from "./UserSearchDialog";
import "./RoomsList.scss";
import useRoom from "../../hooks/useRoom";
import RoomsListItem from "./RoomsListItem";

const RoomsList = () => {
  const { getReactiveRoomCol } = useRoom();
  const rooms = getReactiveRoomCol();

  return (
    <List
      className="rooms-list"
      sx={{ margin: "0 auto", width: "96%", bgcolor: "background.paper" }}
    >
      <div className="button">
        <UserSearchDialog />
      </div>
      {rooms.map((r) => (
        <RoomsListItem key={r.id} room={r} />
      ))}
    </List>
  );
};

export default RoomsList;
