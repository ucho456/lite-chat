import { Button } from "@mui/material";
import "./Chat.scss";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const signOut = () => {
    auth.signOut();
    navigate("/welcome");
  };
  return (
    <div>
      <Button onClick={signOut}>ログアウト</Button>
    </div>
  );
};

export default Chat;
