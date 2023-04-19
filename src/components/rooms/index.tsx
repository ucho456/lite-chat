import { useAppSelector } from "@/store/hooks";
import Body from "@/components/rooms/Body";
import RoomsHeader from "@/components/rooms/RoomsHeader";
import "./index.scss";

const Rooms = () => {
  const rooms = useAppSelector((state) => state.rooms.rooms);
  return (
    <div className="rooms">
      <RoomsHeader />
      <div className="spacer" />
      <div className="list">
        <Body rooms={rooms} />
      </div>
    </div>
  );
};

export default Rooms;
