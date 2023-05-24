import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

type Props = {
  open: boolean;
  onClickReject: () => void;
  onClickAgree: () => void;
  message: string;
};

const DialogConfirm = ({
  open,
  onClickAgree,
  onClickReject,
  message,
}: Props) => {
  return (
    <div className="dialog-confirm">
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickReject}>いいえ</Button>
          <Button onClick={onClickAgree} autoFocus>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogConfirm;
