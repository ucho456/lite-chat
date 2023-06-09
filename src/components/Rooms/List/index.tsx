import { List as MuiList } from "@mui/material";
import DialogUserSearch from "@/components/Rooms/DialogUserSearch";
import ListItem from "@/components/Rooms/List/Item";
import { useAppSelector } from "@/store/hooks";

const List = () => {
  const rooms = useAppSelector((state) => state.rooms.rooms);

  return (
    <MuiList
      className="rooms-body"
      sx={{ margin: "0 auto", width: "96%", bgcolor: "background.paper" }}
    >
      <div style={{ textAlign: "right" }}>
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
