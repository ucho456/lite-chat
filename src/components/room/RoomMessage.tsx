import "./RoomMessage.scss";

type Props = {
  message: Message;
  meUid: string;
};

const RoomMessage = ({ message, meUid }: Props) => {
  return (
    <div className={`room-message ${meUid === message.uid ? "right" : "left"}`}>
      <p>{message.text}</p>
    </div>
  );
};

export default RoomMessage;
