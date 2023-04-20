import { useState } from "react";
import { Avatar, Dialog } from "@mui/material";
import "./DialogProfile.scss";

type Props = {
  you: RoomUser;
};

const DialogProfile = ({ you }: Props) => {
  /** Dialog switch */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="dialog-profile">
      <div className="user-column" onClick={handleOpen}>
        <Avatar className="avatar" src={you.photo ?? "/avatar.png"} />
        <div className="name">{you.name}</div>
      </div>
      <Dialog className="dialog-profile" open={open} onClose={handleClose}>
        aaa
      </Dialog>
    </div>
  );
};

export default DialogProfile;
