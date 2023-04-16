import { Button, List } from "@mui/material";
import UserSearchDialog from "./UserSearchDialog";
import "./RoomsList.scss";
import useRoom from "../../hooks/useRoom";
import RoomsListItem from "./RoomsListItem";

const RoomsList = () => {
  const { getRoomsNextPage, isMax, rooms } = useRoom();

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
      <div className="next-button">
        <Button disabled={isMax} variant="contained" onClick={getRoomsNextPage}>
          さらに読み込む
        </Button>
      </div>
    </List>
  );
};

export default RoomsList;
