import { Button, Dialog } from "@mui/material";
import { useState } from "react";
import "./UserSearchDialog.scss";

const UserSearchDialog = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="user-search-dialog">
      <Button className="button" onClick={handleOpen}>
        新規マッチング
      </Button>
      <Dialog className="user-search-dialog" open={open} onClose={handleClose}>
        dialog
      </Dialog>
    </div>
  );
};

export default UserSearchDialog;
