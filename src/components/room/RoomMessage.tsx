import { useAppSelector } from "../../app/hooks";
import "./RoomMessage.scss";

type Props = {
  message: string;
  meUid: string;
};

const RoomMessage = (props: Props) => {
  const { message, meUid } = props;
  const authUid = useAppSelector((state) => state.auth.uid);
  return (
    <div
      className={meUid === authUid ? "room-message right" : "room-message left"}
    >
      <p>{message}</p>
    </div>
  );
};

export default RoomMessage;
