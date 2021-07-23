import React from 'react'
import { Typography, Container, makeStyles} from '@material-ui/core'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import MatchRow from './MatchRow'

const useStyles = makeStyles(() =>({
    pointer:{
        cursor: 'pointer'
    }
}))

export default function MatchHistory ({tournament_uuid, matches, getMatches, sortColumns}){
    
    const classes = useStyles()

    return(
        <Container>
            <Typography variant="h6">Match History</Typography>
            {matches.length === 0
            ? <Typography>There have not been matches played in this tournament.</Typography>
            :<TableContainer  >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.pointer} onClick={()=> sortColumns('date')} align='center'>Date</TableCell>
                            <TableCell className={classes.pointer} onClick={()=> sortColumns('p1_name')} align='center'>Player 1</TableCell>
                            <TableCell align='center'>Result</TableCell>
                            <TableCell className={classes.pointer} onClick={()=> sortColumns('p2_name')}align='center'>Player 2</TableCell>
                            <TableCell align='center'></TableCell>
                            <TableCell align='center'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {matches.map(match=>
                            <MatchRow 
                                key={match.match_uuid} 
                                match={match} 
                                tournament_uuid={tournament_uuid}
                                getMatches={getMatches}
                            />
                        )}   
                    </TableBody>
                </Table>
            </TableContainer>
            }
        </Container>
    )
}