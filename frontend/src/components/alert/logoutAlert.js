import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
     return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ onOpen, onClose, onAction }) {

     return (
          <React.Fragment>
               <Dialog
                    open={onOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={onClose}
                    aria-describedby="alert-dialog-slide-description"
               >
                    <DialogTitle>{"Apakah anda ingin logout ?"}</DialogTitle>
                    <DialogContent>
                         <DialogContentText id="alert-dialog-slide-description">
                              Tekan YA jika anda ingin logout
                         </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={onClose}>TIDAK</Button>
                         <Button onClick={onAction}>YA</Button>
                    </DialogActions>
               </Dialog>
          </React.Fragment>
     );
}
