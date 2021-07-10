import React, { useState } from 'react'
import { TableRow, TableCell, Button, ButtonGroup, TextField, makeStyles } from '@material-ui/core'
import DeleteMatchDialog from './DeleteMatchDialog';
import { editMatch } from '../../../../../functions/matches';

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

export default function MatchRow({match, tournament_uuid, getMatches}){

    const classes = useStyles()

    const [dialog, setDialog] = useState(false)
    const [edit, setEdit] = useState(false)
    const [date, setDate] = useState(match.date.split('T')[0])
    const [p1wins, setP1wins] = useState(match.p1_wins)
    const [p2wins, setP2wins] = useState(match.p2_wins)
    const [newDate, setNewDate] = useState(date)
    const [newP1wins, setNewP1wins] = useState(p1wins)
    const [newP2wins, setNewP2wins] = useState(p2wins)
    
    const submit = async()=> {
        const response = await editMatch(tournament_uuid, match.match_uuid, newP1wins, newP2wins, newDate)
        if (response.type ==="success") {
            setP1wins(newP1wins)
            setP2wins(newP2wins)
            setDate(newDate)
            setEdit(false)
        }
    }
    return(
        edit 
        ? <TableRow>
            <TableCell align="center">
                <TextField
                    type="date" 
                    defaultValue={date}
                    onChange={(e)=> setNewDate(e.target.value)}
                />
            </TableCell>
            <TableCell align="center">{match.p1_name}</TableCell>
            <TableCell align="center">
                <TextField style={{maxWidth: 100, margin: "0 5px"}}
                    type="number"
                    size="small"
                    label="P1 Wins"
                    defaultValue={p1wins}
                    onChange={(e)=> setNewP1wins(e.target.value)}
                />
                <TextField style={{maxWidth: 100, margin: "0 5px"}}
                    type="number"
                    size="small"
                    label="P2 Wins"
                    defaultValue={p2wins}
                    onChange={(e)=> setNewP2wins(e.target.value)}
                />
            </TableCell>
            <TableCell align="center">{match.p2_name}</TableCell>
            <TableCell align="center">
                <ButtonGroup>
                    <Button 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        onClick={()=> submit()}  
                    >
                        Save
                    </Button>
                    <Button 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        onClick={()=>setEdit(false)}
                    >
                        Exit
                    </Button>
                </ButtonGroup>
            </TableCell>
        </TableRow>
        :<>
            <TableRow>
                <TableCell align="center">{date}</TableCell>
                <TableCell align="center">{match.p1_name} ({match.p1_rating})</TableCell>
                <TableCell align="center">{p1wins} - {p2wins}</TableCell>
                <TableCell align="center">({match.p2_rating}) {match.p2_name} </TableCell>
                <TableCell align="center">
                    <Button 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        onClick={()=>setEdit(true)}
                    >
                        Edit
                    </Button>
                </TableCell>
                <TableCell align="center">
                    <Button 
                        size="small" 
                        className={classes.delete} 
                        variant="outlined" 
                        onClick={()=> setDialog(true)}>
                            DELETE
                    </Button>
                </TableCell>
            </TableRow>
            {dialog 
            ? <DeleteMatchDialog 
                match_uuid={match.match_uuid} 
                open={dialog} 
                tournament_uuid={tournament_uuid}
                handleClose={()=>setDialog(false)}
                getMatches={getMatches}
            />
            : null
            }
        </> 
    )
}