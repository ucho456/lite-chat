import useMessage from "@/hooks/useMessage";
import RoomMessage from "@/components/room/RoomMessage";
import "./RoomBody.scss";

type Props = {
  me: RoomUser;
  bodyRef: React.RefObject<HTMLDivElement>;
};

const RoomBody = ({ me, bodyRef }: Props) => {
  const { messages } = useMessage();
  return (
    <div className="room-body">
      <div className="container" ref={bodyRef}>
        {messages.map((m) => (
          <RoomMessage key={m.id} message={m} meUid={me.uid} />
        ))}
      </div>
    </div>
  );
};

export default RoomBody;
