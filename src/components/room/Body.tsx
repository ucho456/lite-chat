import "./Body.scss";

type Props = {
  bodyRef: React.RefObject<HTMLDivElement>;
  me: RoomUser;
  messages: Message[];
};

const Body = ({ bodyRef, me, messages }: Props) => {
  return (
    <div className="room-body">
      <div className="container" ref={bodyRef}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`room-message ${me.uid === m.uid ? "right" : "left"}`}
          >
            <p>{m.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
