import { List as MuiList } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import DialogUserSearch from "@/components/rooms/DialogUserSearch";
import ListItem from "@/components/rooms/ListItem";
import "./List.scss";

const List = () => {
  const rooms = useAppSelector((state) => state.rooms.rooms);

  return (
    <MuiList
      className="rooms-body"
      sx={{ margin: "0 auto", width: "96%", bgcolor: "background.paper" }}
    >
      <div className="matching-button">
        <DialogUserSearch rooms={rooms} />
      </div>
      {rooms.length === 0 ? (
        <div>マッチした相手がいません。</div>
      ) : (
        rooms.map((r) => <ListItem key={r.id} room={r} />)
      )}
    </MuiList>
  );
};

export default List;
