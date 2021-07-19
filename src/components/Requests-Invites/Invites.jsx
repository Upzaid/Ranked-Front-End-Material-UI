import React, {useState, useEffect} from 'react'
import { Box, CircularProgress} from '@material-ui/core'
import InviteTable from './InviteTable'
import { getUserInvites } from '../../functions/user'

export default function Invites(){

    useEffect(()=>{
        fetchInvites()
    },[])

    const [invites, setInvites] = useState()

    const fetchInvites = async ()=>{
        const response = await getUserInvites()
        if (!response.message) setInvites(response)
    }

    return(
        <>
            {!invites
            ? <Box style={{textAlign: 'center'}}><CircularProgress /></Box>
            : <InviteTable getInvites={fetchInvites} invites={invites}/>
            }
        </>
    )
}