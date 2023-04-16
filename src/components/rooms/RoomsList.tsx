import { Button, List } from "@mui/material";
import UserSearchDialog from "./UserSearchDialog";
import "./RoomsList.scss";
import useRoom from "../../hooks/useRoom";
import RoomsListItem from "./RoomsListItem";

const RoomsList = () => {
  const { getRoomsNextPage, rooms } = useRoom();

  return (
    <List
      className="rooms-list"
      sx={{ margin: "0 auto", width: "96%", bgcolor: "background.paper" }}
    >
      <div className="button">
        <UserSearchDialog rooms={rooms} />
      </div>
      {rooms.length === 0 ? (
        <div>マッチしたあいてがいません。</div>
      ) : (
        rooms.map((r) => <RoomsListItem key={r.id} room={r} />)
      )}
      <Button onClick={getRoomsNextPage}>ose</Button>
    </List>
  );
};

export default RoomsList;
