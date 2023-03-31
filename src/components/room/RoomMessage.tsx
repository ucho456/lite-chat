import "./RoomMessage.scss";

type Props = {
  message: Message;
  meUid: string;
};

const RoomMessage = (props: Props) => {
  const { message, meUid } = props;
  return (
    <div
      className={
        meUid === message.uid ? "room-message right" : "room-message left"
      }
    >
      <p>{message.text}</p>
    </div>
  );
};

export default RoomMessage;
