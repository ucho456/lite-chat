import { memo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

type Props = {
  open: boolean;
  onClickReject: () => void;
  onClickAgree: () => void;
  message: string;
};

const DialogConfirm = memo(
  ({ open, onClickAgree, onClickReject, message }: Props) => {
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
  },
);

DialogConfirm.displayName = "DialogConfirm";

export default DialogConfirm;
