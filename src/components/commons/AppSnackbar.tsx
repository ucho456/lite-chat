import { Snackbar } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { forwardRef } from "react";
import "./AppSnackbar.scss";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose?: () => void;
};

const AppSnackbar = ({ open, message, severity = "info", onClose }: Props) => {
  return (
    <div className="app-snackbar">
      <Snackbar
        open={open}
        onClose={onClose}
        autoHideDuration={3 * 1000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );
};

export default AppSnackbar;