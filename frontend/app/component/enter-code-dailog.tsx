import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../redux/hook/hook';
import { setOtp } from '../redux/slice/socket.slice';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);
  const [otpValue, setOtpValue] = React.useState("");
  const dispatch = useAppDispatch();
  const handleSetOtp = () => {
    dispatch(setOtp(otpValue));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Enter 6 Digit Code"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter 6 Digit Code here which is displaying on the second Device to Login
          </DialogContentText>
          <input
            type="text"
            value={otpValue}
            maxLength={6}
            onChange={(e) => setOtpValue(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Reject</Button>
          <Button onClick={handleSetOtp} disabled={otpValue.length !== 6} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
