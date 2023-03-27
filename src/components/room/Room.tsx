import { Avatar, IconButton } from "@mui/material";
import { Logout, Phone, Send } from "@mui/icons-material";
import "./Room.scss";
import RoomDialog from "./RoomDialog";
import RoomMessage from "./RoomMessage";

const Room = () => {
  const messages = [...Array(20)].map((_, i) => {
    const user =
      i % 2 === 0 ? { uid: "me", name: "私" } : { uid: "you", name: "貴方" };
    return {
      id: i,
      user,
      message: `メッセージ ${i}`.repeat(10),
    };
  });
  return (
    <div className="room">
      <div className="header">
        <div className="container">
          <div className="photo-column">
            <Avatar src="/avatar.png" />
          </div>
          <div className="name-column">最大１０文字の名前！</div>
          <div className="phone-column">
            <Phone className="phone-icon" fontSize="large" />
          </div>
          <div className="leave-column">
            <Logout className="leave-icon" fontSize="large" />
          </div>
        </div>
      </div>
      <div className="body">
        <div className="container">
          {messages.map((m) => (
            <RoomMessage key={m.id} message={m.message} user={m.user} />
          ))}
        </div>
      </div>
      <div className="footer">
        <form>
          <div className="container">
            <div className="input-column">
              <textarea />
            </div>
            <div className="button-column">
              <IconButton type="submit">
                <Send fontSize="large" />
              </IconButton>
            </div>
          </div>
        </form>
      </div>
      <RoomDialog />
    </div>
  );
};

export default Room;
