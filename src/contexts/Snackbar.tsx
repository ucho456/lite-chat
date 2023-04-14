import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AlertColor } from "@mui/material";
import AppSnackbar from "../components/commons/AppSnackbar";

export type SnackbarContextType = {
  message: string;
  severity: AlertColor;
  openSnackbar: (message: string, severity: AlertColor) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  message: "",
  severity: "error",
  openSnackbar: (_message: string, _severity: AlertColor) => {},
});

export const SnackbarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const context: SnackbarContextType = useContext(SnackbarContext);
  const [message, setMessage] = useState(context.message);
  const [severity, setSeverity] = useState(context.severity);
  const [open, setOpen] = useState(false);

  const newContext: SnackbarContextType = useMemo(
    () => ({
      message,
      severity,
      openSnackbar: (message: string, severity: AlertColor) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
      },
    }),
    [message, severity, setMessage, setSeverity]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setMessage]);

  return (
    <SnackbarContext.Provider value={newContext}>
      {children}
      <AppSnackbar
        open={open}
        message={newContext.message}
        severity={newContext.severity}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};

export function useSnackbar(): SnackbarContextType {
  return useContext(SnackbarContext);
}
