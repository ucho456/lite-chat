import "./Rooms.scss";
import RoomsHeader from "./RoomsHeader";
import RoomsList from "./RoomsList";

const Rooms = () => {
  return (
    <div className="rooms">
      <RoomsHeader />
      <div className="container">
        <div className="list-column">
          <RoomsList />
        </div>
      </div>
    </div>
  );
};

export default Rooms;
