import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

export default function SnackBar({message, open, handleClose, severity}){
    return(
        <Snackbar 
            open={open}
            autoHideDuration={3000}
            onClose={()=> handleClose()}
        >
            <MuiAlert severity={severity}>
                {message}
            </MuiAlert>
        </Snackbar>
    )
}