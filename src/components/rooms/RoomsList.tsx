import { List } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import RoomsListItem from "@/components/rooms/RoomsListItem";
import UserSearchDialog from "@/components/rooms/UserSearchDialog";
import "./RoomsList.scss";

const RoomsList = () => {
  const rooms = useAppSelector((state) => state.rooms.rooms);

  return (
    <List
      className="rooms-list"
      sx={{ margin: "0 auto", width: "96%", bgcolor: "background.paper" }}
    >
      <div className="matching-button">
        <UserSearchDialog rooms={rooms} />
      </div>
      {rooms.length === 0 ? (
        <div>マッチしたあいてがいません。</div>
      ) : (
        rooms.map((r) => <RoomsListItem key={r.id} room={r} />)
      )}
    </List>
  );
};

export default RoomsList;
