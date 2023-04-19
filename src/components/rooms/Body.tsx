import { List } from "@mui/material";
import RoomsListItem from "@/components/rooms/RoomsListItem";
import UserSearchDialog from "@/components/rooms/UserSearchDialog";
import "./Body.scss";

type Props = {
  rooms: Room[];
};

const Body = ({ rooms }: Props) => {
  return (
    <List
      className="rooms-body"
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

export default Body;
