import React from 'react'
import { Typography, Container} from '@material-ui/core'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import MatchRow from './MatchRow'

export default function MatchHistory ({tournament_uuid, matches, getMatches}){
    
    return(
        <Container>
            <Typography variant="h6">Match History</Typography>
            {matches.length === 0
            ? <Typography>There have not been matches played in this tournament.</Typography>
            :<TableContainer  >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Date</TableCell>
                            <TableCell align='center'>Player 1</TableCell>
                            <TableCell align='center'>Result</TableCell>
                            <TableCell align='center'>Player 2</TableCell>
                            <TableCell align='center'></TableCell>
                            <TableCell align='center'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {matches.map(match=><MatchRow 
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