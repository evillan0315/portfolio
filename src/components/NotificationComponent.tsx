"use client";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

interface NotificationComponentProps {
  message: string;
  openNotification: boolean;
  severity: AlertColor;
  handleClose: () => void;
}
const NotificationComponent: React.FC<NotificationComponentProps> = ({
  message,
  openNotification,
  handleClose,
  severity,
}) => {
  /*   const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
  }; */

  return (
    <div>
      <Snackbar
        open={openNotification}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default NotificationComponent;
