import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Block, ChevronLeft, Phone } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { onSnapshot } from "firebase/firestore";
import DialogConfirm from "@/components/commons/DialogConfirm";
import DialogProfile from "@/components/commons/DialogProfile";
import { useSnackbar } from "@/contexts/Snackbar";
import { blockRoom, getCallColRef } from "@/utils/firestore";
import "./Header.scss";

type Props = {
  me: RoomUser;
  you: RoomUser;
};

type DialogType = "" | "call" | "answer" | "block";

const Header = ({ me, you }: Props) => {
  const navigate = useNavigate();
  const handleNavigateRooms = (): void => navigate("/rooms");
  const { roomId } = useParams<{ roomId: string }>();

  /** Dialog */
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [dialogType, setDialogType] = useState<DialogType>("");
  const handleReject = (): void => {
    setOpen(false);
    setMessage("");
    setDialogType("");
  };

  /** Call phone */
  const handleCallPhone = (): void => {
    setDialogType("call");
    setMessage(
      `${you.name}さんとビデオ電話で通話しますか？（相手がチャットルームにいないと通知されません。）`,
    );
    setOpen(true);
  };
  const handlePushToPhone = (): void => {
    navigate(`/rooms/${roomId}/phone?caller=true`);
  };

  /** Watch phone request */
  const [callId, setCallId] = useState<string | null>(null);
  const handleAgree = () => {
    setOpen(false);
    navigate(`/rooms/${roomId}/phone?callId=${callId}`);
  };
  useEffect(() => {
    if (!roomId || !you) return;
    const callColRef = getCallColRef(roomId);
    const unsubscribe = onSnapshot(callColRef, async (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          setCallId(doc.id);
          setDialogType("answer");
          setMessage(
            `${you.name}さんからビデオ電話のリクエストを受けました。通話しますか？`,
          );
          setOpen(true);
        }
      });
    });
    return () => unsubscribe();
  }, [roomId, you]);

  /** Block user */
  const { openSnackbar } = useSnackbar();
  const handleBlock = (): void => {
    setDialogType("block");
    setMessage(`${you.name}さんをブロックしますか？`);
    setOpen(true);
  };
  const handleBlockUser = (): void => {
    if (!roomId) return;
    try {
      /** Exit the room before waiting for block results. */
      blockRoom(roomId, me.uid, you.uid);
      openSnackbar(`${you.name}さんをブロックしました。`, "success");
      handleNavigateRooms();
    } catch {
      openSnackbar("ブロックに失敗しました。", "error");
    }
  };

  return (
    <div className="room-header">
      <div className="container">
        <div className="leave-column">
          <IconButton onClick={handleNavigateRooms}>
            <ChevronLeft fontSize="large" />
          </IconButton>
        </div>
        <div className="photo-column">
          <DialogProfile you={you} />
        </div>
        <div className="phone-column">
          <IconButton onClick={handleCallPhone}>
            <Phone fontSize="large" />
          </IconButton>
        </div>
        <div className="block-column">
          <IconButton onClick={handleBlock}>
            <Block fontSize="large" />
          </IconButton>
        </div>
      </div>
      <DialogConfirm
        open={open}
        onClickAgree={
          dialogType === "call"
            ? handlePushToPhone
            : dialogType === "answer"
            ? handleAgree
            : handleBlockUser
        }
        onClickReject={handleReject}
        message={message}
      />
    </div>
  );
};

export default Header;
