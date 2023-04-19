import Header from "@/components/rooms/Header";
import List from "@/components/rooms/List";
import "./index.scss";

const Rooms = () => {
  return (
    <div className="rooms">
      <Header />
      <div className="spacer" />
      <div className="list">
        <List />
      </div>
    </div>
  );
};

export default Rooms;
