import "./RoomMessage.scss";

type Props = {
  user: {
    uid: string;
    name: string;
  };
  message: string;
};

const RoomMessage = (props: Props) => {
  const { user, message } = props;
  return (
    <div
      className={user.uid === "me" ? "room-message right" : "room-message left"}
    >
      <p>{message}</p>
    </div>
  );
};

export default RoomMessage;
