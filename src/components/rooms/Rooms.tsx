import "./Rooms.scss";
import RoomsHeader from "./RoomsHeader";
import RoomsList from "./RoomsList";

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
