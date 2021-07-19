import React, { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import { getUserRequests } from '../../functions/user'
import RequestTable from './RequestTable'

export default function Requests(){
    
    useEffect(()=>{
        fetchRequests()
    },[])

    const [requests, setRequests] = useState()

    const fetchRequests = async ()=>{
        const response = await getUserRequests()
        if (!response.message) setRequests(response)
    }

    return(
        <>
            {!requests
            ? <Box style={{textAlign: 'center'}}><CircularProgress /></Box>
            : <RequestTable getRequests={fetchRequests} requests={requests}/>
            }
        </>
    )
}