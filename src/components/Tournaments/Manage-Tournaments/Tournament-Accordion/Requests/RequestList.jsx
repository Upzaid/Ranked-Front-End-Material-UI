import React, { useState, useEffect } from 'react'
import { getTournamentRequests } from '../../../../../functions/request'
import { Box, Typography, Container, CircularProgress } from '@material-ui/core'
import { Table, TableRow, TableCell } from '@material-ui/core'
import RequestRow from './RequestRow'

export default function Requests({tournament_uuid}){
    
    const [requests, setRequests] = useState()

    useEffect(()=>{
        fetchRequests()
    }, [])
    
    const fetchRequests = async()=>{
        const response = await getTournamentRequests(tournament_uuid)
        if (!response.message) setRequests(response)
    }

    return(
        <Box style={{paddingBottom: 40}}>
        {requests
        ? requests.length > 0 
            ?<Table size="small">
                <TableRow>
                    <TableCell variant="head">Username</TableCell>
                    <TableCell variant="head">Status</TableCell>
                    <TableCell variant="head"></TableCell>
                </TableRow>
                {requests.map(request =>{
                    return(
                        <RequestRow 
                            key={request.user_uuid}
                            request={request}
                            getRequests={fetchRequests}
                            tournament_uuid={tournament_uuid}
                        />
                    )
                })
            }
            </Table>
            : <Typography>This tournament has no pending requests.</Typography>
        : <Container style={{textAlign: 'center'}}><CircularProgress /></Container>
        }
    </Box>
    )
}