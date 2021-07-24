import React from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core'

export default function GenericDialog({handleClose, open, onConfirm, onCancel, message, confirmLabel }){
    return(
        <Dialog
            open={open}
            onClose={()=> handleClose()}
        >
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button color='primary' onClick={()=> onConfirm()}>
                    {confirmLabel}
                </Button>
                <Button color='primary' onClick={()=> onCancel()}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>  
    )
}