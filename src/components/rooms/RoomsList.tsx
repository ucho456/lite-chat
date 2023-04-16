import { Button, List } from "@mui/material";
import UserSearchDialog from "./UserSearchDialog";
import "./RoomsList.scss";
import useRoom from "../../hooks/useRoom";
import RoomsListItem from "./RoomsListItem";
import { useAppSelector } from "../../store/hooks";
import { useState } from "react";

const RoomsList = () => {
  const { getReactiveRoomCol } = useRoom();
  const [limitNum, setLimitNum] = useState(1);
  const authUid = useAppSelector((state) => state.auth.uid);
  const rooms = getReactiveRoomCol(authUid, limitNum);

  const handleNextPage = () => {
    setLimitNum((preLimit) => preLimit + 1);
  };

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
      <Button onClick={handleNextPage}>ose</Button>
    </List>
  );
};

export default RoomsList;
