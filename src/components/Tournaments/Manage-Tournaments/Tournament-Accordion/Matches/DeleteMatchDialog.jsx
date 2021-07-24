import React, { useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core'
import { deleteMatch } from '../../../../../functions/matches'
import SnackBar from '../../../../SnackBar'


export default function DeleteMatchDialog({match_uuid, open, handleClose, tournament_uuid, getMatches}){
    
    const [snackbar, setSnackbar] = useState(false)
    const [severity, setSeverity] = useState()
    const [message, setMessage] = useState()

    const deleteFunction = async ()=>{
        const response = await deleteMatch(tournament_uuid, match_uuid)
        setSeverity(response.type)
        setMessage(response.message)
        setSnackbar(true)
        if(response.type === 'success') getMatches()
    }

    return(
        <Dialog
            open={open}
            onClose={()=>handleClose()}
        >
            <DialogContent>
                Are you sure you want to delete this match?
            </DialogContent>
            <DialogActions>
                <Button 
                    color='primary'
                    onClick={()=>deleteFunction()}
                >
                        Delete
                </Button>
                <Button 
                    color='primary'
                    onClick={()=>handleClose()}
                >
                    Cancel
                </Button>
            </DialogActions>
            {snackbar
            ? <SnackBar 
                open={snackbar}
                severity={severity}
                onClose={()=> setSnackbar(false)}
                message={message}
            />
            :null
            }
        </Dialog>
    )
}