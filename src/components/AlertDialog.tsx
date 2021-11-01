import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface AlertAction {
  label: string;
  action: () => any;
}

export interface AlertStateProps {
  open: boolean;
  title: string;
  message: string;
  actions?: {
    positive?: AlertAction;
    negative?: AlertAction;
  };
}

interface AlertProps {
  show: boolean;
  title: string;
  message: string;
  positiveButton?: AlertAction;
  negativeButton?: AlertAction;
  onCloseCallback: () => any;
}

export const AlertDialog: React.FC<AlertProps> = ({
  show,
  title,
  message,
  positiveButton,
  negativeButton,
  onCloseCallback,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleOpen(show);
  }, [show]);

  const handleOpen = (value: boolean) => {
    setOpen(value);
  };

  const handleClose = () => {
    setOpen(false);
    onCloseCallback();
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {negativeButton && (
          <Button onClick={handleClose} color="primary">
            {negativeButton.label}
          </Button>
        )}
        {positiveButton && (
          <Button onClick={positiveButton.action} color="primary">
            {positiveButton.label}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
