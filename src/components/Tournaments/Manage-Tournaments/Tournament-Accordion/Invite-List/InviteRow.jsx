import React, {useState} from 'react'
import { TableRow, TableCell, Button, makeStyles, Dialog, DialogActions, DialogContent } from '@material-ui/core'
import { cancelInvite } from '../../../../../functions/invite';

const useStyles = makeStyles(theme=>({
    delete:{
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main,
        '&:hover':{
            backgroundColor: "#ffebee"
        }
    }
  }));

export default function InviteRow({invite,tournament_uuid, getInvites}){

    const classes = useStyles()
    const [open, setOpen] = useState(false)
    
    const deleteInvite = async ()=>{
        await cancelInvite(tournament_uuid, invite.user_uuid)
        getInvites()
    }

    return(
        <>
            <TableRow>
                <TableCell >{invite.username}</TableCell>
                <TableCell >{invite.status}</TableCell>
                <TableCell style={{textAlign: 'right'}}>
                    <Button
                        className={classes.delete}
                        size="small"
                        onClick={()=> setOpen(true)}
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
            <Dialog 
                open={open}
                onClose={()=> setOpen(false)}    
            >
                <DialogContent>
                    Are you sure you want to delete the invite to {invite.username}?
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={()=>deleteInvite()}
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={()=>setOpen(false)}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}