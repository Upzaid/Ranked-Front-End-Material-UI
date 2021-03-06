import React from 'react'
import PlayerRow from './PlayerRow'
import { Typography, Container, Paper, makeStyles} from '@material-ui/core'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

const useStyles = makeStyles(() =>({
    pointer:{
        cursor: 'pointer'
    }
}))

export default function PlayerList({players, tournament_uuid, getPlayers, sortRating, sortColumn}){

    const classes = useStyles()

    return(
       <Container>
               <Typography variant="h6">Player List</Typography>
               {!players || players.length === 0
                ? <Typography> There are no players in this tournament. Add a player above.</Typography> 
                : <TableContainer> 
                    <Table component={Paper}>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell className={classes.pointer} onClick={()=> sortColumn('name')}>Name </TableCell>
                                <TableCell className={classes.pointer} onClick={()=> sortRating()} >Rating</TableCell>
                                <TableCell className={classes.pointer} onClick={()=> sortColumn('player_type')}>Type</TableCell>
                                <TableCell />
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players.map(player=>{
                                return(
                                <PlayerRow 
                                    key={player.player_uuid} 
                                    tournament_uuid={tournament_uuid} 
                                    player={player} 
                                    getPlayers={getPlayers}/>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
               }
       </Container>
    )
}

