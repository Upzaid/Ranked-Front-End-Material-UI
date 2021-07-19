import React, { useState } from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles, Table, TableRow, TableBody, TableCell } from '@material-ui/core'
import GenericDialog from '../GenericDialog'
import SnackBar from '../SnackBar'
import { acceptInvite, declineInvite } from '../../functions/invite'

const useStyles = makeStyles(theme=>({
      delete:{
          borderColor: theme.palette.error.main,
          color: theme.palette.error.main,
          '&:hover':{
              backgroundColor: "#ffebee"
          }
      }
}))

function InviteRow({invite, getInvites}){

    const classes = useStyles()
    
    const [acceptDialog, setAcceptDialog] = useState(false)
    const [declineDialog, setDeclineDialog] = useState(false)
    const [snackbar, setSnackbar] = useState(false)
    const [message, setMessage] = useState()
    const [severity, setSeverity] = useState()

    const accept = ()=>{
        acceptInvite(invite.tournament_uuid)
            .then(data=>{
                setMessage(data.message)
                setSeverity(data.type)
                setSnackbar(true)
                setAcceptDialog(false)
                getInvites()
            })
    }
    const decline = ()=>{
        declineInvite(invite.tournament_uuid)
            .then(data=>{
                setMessage(data.message)
                setSeverity(data.type)
                setSnackbar(true)
                setDeclineDialog(false)
                getInvites()
            })
    }

    return (
        <TableRow>
            <TableCell>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography>{invite.tournament_name}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Button color="primary" onClick={()=>setAcceptDialog(true)}>
                            Accept
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button className={classes.delete} onClick={()=>setDeclineDialog(true)}>
                            Decline
                        </Button>
                    </Grid>
                </Grid>
            </TableCell>
            <GenericDialog 
                handleClose={()=>setAcceptDialog(false)}
                onCancel={()=>setAcceptDialog(false)}
                message={`Do you want to accept invite from ${invite.tournament_name}`}
                open={acceptDialog}
                onConfirm={()=>accept()}
                confirmLabel="Accept"
            />
            <GenericDialog 
                handleClose={()=>setDeclineDialog(false)}
                onCancel={()=>setDeclineDialog(false)}
                message={`Do you want to decline invite from ${invite.tournament_name}`}
                open={declineDialog}
                onConfirm={()=>decline()}
                confirmLabel="Decline"
            />
            <SnackBar 
                message={message}
                open={snackbar}
                handleClose={()=> setSnackbar(false)}
                severity={severity}
            />
        </TableRow>
    )
}

export default function InviteTable({invites, getInvites}){

    return(
        invites.length === 0
        ? <Typography>You have no pending invites.</Typography>
        : <Table>
            <TableBody>
                {invites.map(invite=>{
                    return(
                        <InviteRow 
                            key={invite.tournament_uuid} 
                            invite={invite}
                            getInvites={getInvites}
                        />
                    )
                })}
            </TableBody>
        </Table>
    )
}