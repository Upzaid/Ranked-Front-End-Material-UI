import React, { useState, useEffect } from 'react'
import { getTournamentInvites } from '../../../../../functions/invite'
import { Container, CircularProgress, Table, TableRow, TableCell, Typography, Box } from '@material-ui/core'
import InviteRow from './InviteRow'

export default function InviteList({tournament_uuid}){

    useEffect(()=>{
        fetchInvites()
    },[])
    const [error, setError] = useState()
    const [invites, setInvites] = useState()

    const fetchInvites = ()=>{
        getTournamentInvites(tournament_uuid)
            .then(data=> data.message 
                ? setError(data)
                : setInvites(data) 
                )
    }

    return(
        <Box style={{paddingBottom: 40}}>
            {invites
            ? invites.length > 0 
                ?<Table size="small">
                    <TableRow>
                        <TableCell variant="head">Username</TableCell>
                        <TableCell variant="head">Status</TableCell>
                        <TableCell variant="head"></TableCell>
                    </TableRow>
                    {invites.map(invite =>{
                        return(
                            <InviteRow 
                                key={invite.user_uuid}
                                invite={invite}
                                getInvites={fetchInvites}
                                tournament_uuid={tournament_uuid}
                            />
                        )
                    })
                }
                </Table>
                : <Typography>This tournament has no pending invites.</Typography>
            : <Container style={{textAlign: 'center'}}><CircularProgress /></Container>
            }
        </Box>
    )
}