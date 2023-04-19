import { List as MuiList } from "@mui/material";
import DialogUserSearch from "@/components/rooms/DialogUserSearch";
import ListItem from "@/components/rooms/ListItem";
import "./List.scss";

type Props = {
  rooms: Room[];
};

const List = ({ rooms }: Props) => {
  return (
    <MuiList
      className="rooms-body"
      sx={{ margin: "0 auto", width: "96%", bgcolor: "background.paper" }}
    >
      <div className="matching-button">
        <DialogUserSearch rooms={rooms} />
      </div>
      {rooms.length === 0 ? (
        <div>マッチしたあいてがいません。</div>
      ) : (
        rooms.map((r) => <ListItem key={r.id} room={r} />)
      )}
    </MuiList>
  );
};

export default List;
