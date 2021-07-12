import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core'

export default function GenericDialog({handleClose, open, onConfirm, onCancel, message, confirmLabel }){
    return(
        <Dialog>
            <Dialog
                open={open}
                onClose={()=> handleClose()}
            >
                <DialogTitle>{message}</DialogTitle>
                <DialogActions>
                    <Button color='primary' onClick={()=> onConfirm()}>
                        {confirmLabel}
                    </Button>
                    <Button color='primary' onClick={()=> onCancel()}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Dialog>
    )
}