import React, {useState} from 'react'
import { Typography, Collapse, IconButton, TextField, Button, ButtonGroup, makeStyles } from '@material-ui/core'
import { Dialog, DialogActions, DialogContent } from '@material-ui/core'
import { TableRow, TableCell,  } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import PlayerHistoryTable from './PlayerHistoryTable';
import { editPlayer, deletePlayer } from '../../../../../functions/players';

const useStyles = makeStyles(theme=>({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    delete:{
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main,
        '&:hover':{
            backgroundColor: "#ffebee"
        }
    }
  }));

export default function PlayerRow({player, tournament_uuid, getPlayers}){

    const classes = useStyles()
    const [open, setOpen] =useState(false)
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(player.name)
    const [newName, setNewName] = useState()
    const [dialog, setDialog] = useState(false)
    
    const localPlayerEdit = async()=>{
        const response =await editPlayer(newName, tournament_uuid, player.player_uuid)
        if(response.type === 'success') setName(newName)
    }

    const deleteLocalPlayer = async()=>{
        const response = await deletePlayer(player.player_uuid, tournament_uuid)
        if (response.type === 'success'){
            getPlayers()
        }
        setDialog(false)
    }
    return(
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton size="small"  onClick={()=>setOpen(!open)}>
                        {open? <KeyboardArrowUpIcon/> : <KeyboardArrowDown/>}
                    </IconButton>
                </TableCell>
                {!edit 
                ?<>
                    <TableCell component="th" >{name}</TableCell>
                    <TableCell component="th" >{player.matches.length > 0 ? player.matches[player.matches.length - 1].player_rating : 1200}</TableCell>
                    <TableCell component="th" >{player.player_type}</TableCell>
                    <TableCell component="th" >
                        {player.player_type === 'Local'
                        ?<Button size="small" color="primary"  onClick={()=> setEdit(!edit)}>Edit</Button>
                        : null
                        }
                    </TableCell>
                </>
                : <>
                    <TableCell colSpan={2}>
                        <TextField 
                            label="Name" 
                            defaultValue={name} 
                            onChange={(e)=>setNewName(e.target.value)}
                            size="small"
                        />
                    </TableCell>
                    <TableCell colSpan={2}>
                        <ButtonGroup color="primary" >
                            <Button size="small" onClick={()=> localPlayerEdit() }>Save</Button>
                            <Button size="small" onClick={()=>{ setEdit(!edit); setName(name) }}>Exit</Button>
                        </ButtonGroup>
                    </TableCell>
                </>
                }
                <TableCell  >
                    <Button size="small" className={classes.delete}  onClick={()=> setDialog(true)}>DROP / DELETE</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {!player.matches || player.matches.length ===0 
                        ? <Typography>This player has not played any matches.</Typography>
                        : <PlayerHistoryTable matches={player.matches}/>
                    }
                    </Collapse>
                </TableCell>
            </TableRow>
            { dialog 
            ? <Dialog
                open={dialog}
                onClose={()=> setDialog(false)}
            >
                <DialogContent>Are you sure you want { player.player_type==="Local" ? 'delete' : 'remove'} {player.name}?</DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={()=> deleteLocalPlayer()}>
                        Delete
                    </Button>
                    <Button color='primary' onClick={()=> setDialog(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            : null
            }
        </>
    )
}