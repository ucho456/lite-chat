import RoomsHeader from "@/components/rooms/RoomsHeader";
import RoomsList from "@/components/rooms/RoomsList";
import "./Rooms.scss";

const Rooms = () => {
  return (
    <div className="rooms">
      <RoomsHeader />
      <div className="spacer" />
      <div className="list">
        <RoomsList />
      </div>
    </div>
  );
};

export default Rooms;
