import React, { useState } from 'react'
import { Button, TableRow, TableCell, makeStyles } from '@material-ui/core'
import GenericDialog from '../../../../GenericDialog'
import SnackBar from '../../../../SnackBar'
import { acceptRequest, declineRequest } from '../../../../../functions/request';

const useStyles = makeStyles(theme=>({
    delete:{
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main,
        '&:hover':{
            backgroundColor: "#ffebee"
        }
    }
  }));

export default function RequestRow({request, tournament_uuid, getRequests}){
    
    const classes = useStyles()
    const [acceptDialog, setAcceptDialog] = useState(false)
    const [declineDialog, setDeclineDialog] = useState(false)
    const [message, setMessage] = useState()
    const [severity, setSeverity] = useState()
    const [snackbar, setSnackbar] = useState(false)

    const accept = async ()=>{
        const response = await acceptRequest(tournament_uuid, request.user_uuid)
        setMessage(response.message)
        setSeverity(response.type)
        setSnackbar(true)
        getRequests()
    }

    const decline = async ()=>{
        const response = await declineRequest(tournament_uuid, request.user_uuid)
        setMessage(response.message)
        setSeverity(response.type)
        setSnackbar(true)
        getRequests()
    }

    return(
        <TableRow>
            <TableCell >{request.username}</TableCell>
            <TableCell >{request.status}</TableCell>
            <TableCell style={{textAlign: 'right'}}>
                <Button
                    color='primary'
                    size="small"
                    onClick={()=> setAcceptDialog(true)}
                >
                    Accept
                </Button>
                <Button
                    className={classes.delete}
                    size="small"
                    onClick={()=> setDeclineDialog(true)}
                >
                    Decline
                </Button>
            </TableCell>
            <GenericDialog 
                open={acceptDialog}
                handleClose={()=> setAcceptDialog(false)}
                onCancel={()=> setAcceptDialog(false)}
                message={`Are you sure you want to accept the join request from ${request.username}?`}
                confirmLabel="Accept"
                onConfirm={()=> accept()}
            />
            <GenericDialog 
                open={declineDialog}
                handleClose={()=> setDeclineDialog(false)}
                onCancel={()=> setDeclineDialog(false)}
                message={`Are you sure you want to decline the join request from ${request.username}?`}
                confirmLabel="Decline"
                onConfirm={()=> decline()}
            />
            <SnackBar
                open={snackbar}
                message={message}
                handleClose={()=> setSnackbar(false)}
                severity={severity}
            />
        </TableRow>
    )
}