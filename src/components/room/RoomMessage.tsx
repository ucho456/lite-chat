import { useAppSelector } from "../../app/hooks";
import "./RoomMessage.scss";

type Props = {
  message: string;
  meId: string;
};

const RoomMessage = (props: Props) => {
  const { message, meId } = props;
  const authUid = useAppSelector((state) => state.auth.uid);
  return (
    <div
      className={meId === authUid ? "room-message right" : "room-message left"}
    >
      <p>{message}</p>
    </div>
  );
};

export default RoomMessage;
