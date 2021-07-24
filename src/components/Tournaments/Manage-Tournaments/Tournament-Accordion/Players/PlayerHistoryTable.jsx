import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { Table, TableRow, TableCell } from '@material-ui/core'
import EloProgressionGraph from './EloProgressionGraph'

export default function PlayerHistoryTable({matches}) {

    return(
        <Box >
            <Typography variant="subtitle1" style={{textAlign: 'center'}}>Match History</Typography>
            <br />
            <Grid container justify='center'>
                <Box style={{width: 850, height: 400}}>
                    <EloProgressionGraph 
                        matches={matches}
                    />
                </Box>
            </Grid>
            <br />
            <Table size="small">
                <TableRow >
                    <TableCell align='center' variant='head'>Date</TableCell>
                    <TableCell align='center' variant='head'>Result</TableCell>
                    <TableCell align='center' variant='head'>Opponent</TableCell>
                    <TableCell align='center' variant='head'>Rating</TableCell>
                </TableRow>
                    {matches.map(match=>{
                        return (
                            <TableRow key={match.match_uuid}>
                                <TableCell align="center">{match.date.split('T')[0]}</TableCell>
                                <TableCell align="center">{match.player_wins} - {match.opponent_wins}</TableCell>
                                <TableCell align="center">{match.opponent_name} ({match.opponent_rating})</TableCell>
                                <TableCell align="center">{match.player_rating}</TableCell>
                            </TableRow>
                        )
                    })}
            </Table>
        </Box>
    )
}