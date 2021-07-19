import React from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles, Table, TableRow, TableBody, TableCell } from '@material-ui/core'
import GenericDialog from '../GenericDialog'
import SnackBar from '../SnackBar'
import { useState } from 'react'
import { cancelRequest } from '../../functions/request'

const useStyles = makeStyles(theme=>({
    delete:{
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main,
        '&:hover':{
            backgroundColor: "#ffebee"
        }
    }
}))

function RequestRow({request, getRequests}) {
    const classes = useStyles()

    const [dialog, setDialog] = useState(false)
    const [snackbar, setSnackbar] = useState(false)
    const [message, setMessage] = useState()
    const [severity, setSeverity] = useState()

    const cancel = async ()=>{
        const response = await cancelRequest(request.tournament_uuid)
        setMessage(response.message)
        setSeverity(response.type)
        setSnackbar(true)
        getRequests()
    }

    return(
        <TableRow>
        <TableCell>
            <Grid container>
                <Grid item xs={10}>
                    <Typography>{request.tournament_name}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button className={classes.delete} onClick={()=>setDialog(true)}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </TableCell>
        <GenericDialog 
            handleClose={()=>setDialog(false)}
            onCancel={()=>setDialog(false)}
            message={`Do you want to cancel the request to ${request.tournament_name}?`}
            open={dialog}
            onConfirm={()=>cancel()}
            confirmLabel="Accept"
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

export default function RequestTable({requests, getRequests}) {
    return(
        requests.length === 0
        ? <Typography>You have no pending invites.</Typography>
        : <Table>
            <TableBody>
                {requests.map(request=>{
                    return(
                        <RequestRow 
                            key={request.tournament_uuid} 
                            request={request}
                            getRequests={getRequests}
                        />
                    )
                })}
            </TableBody>
        </Table>
    )
}