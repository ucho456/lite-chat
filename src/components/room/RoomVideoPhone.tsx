import { Phone } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";

type Props = {
  me: RoomUser;
  you: RoomUser;
};

const RoomVideoPhone = (props: Props) => {
  const { me, you } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const constraints = { audio: true, video: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current === null) {
          return;
        }
        videoRef.current.srcObject = stream;
      })
      .catch((error: any) => {
        alert(error.message);
      });
  });

  const [open, setOpen] = useState(false);
  const handlePhone = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={() => handlePhone()}>
        <Phone fontSize="large" />
      </IconButton>
      <Dialog open={open}>
        <DialogContent>
          <video autoPlay muted ref={videoRef} />
          <div>{me.name}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>終了</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoomVideoPhone;
