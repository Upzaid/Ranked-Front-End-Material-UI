import React, { useState } from 'react'
import { Card, CardContent, CardActions } from '@material-ui/core'
import { Typography, Button } from '@material-ui/core'
import { sendInvite } from '../../../../../functions/invite'
import SnackBar from '../../../../SnackBar'

export default function UserRresultCard({user, tournament_uuid}){

    const [severity, setSeverity] = useState()
    const [open, setOpen] = useState(false)
    const [message, setMessage] =useState()

    const submit = async()=>{
        const response = await sendInvite(tournament_uuid, user.user_uuid)
        setSeverity(response.type)
        setMessage(response.message)
        setOpen(true)
    }

    return(
        <>
            <Card variant='outlined'>
                <CardContent>
                    <Typography  gutterBottom>
                        {user.username}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        color="primary" 
                        size="small"
                        onClick={()=> submit()}
                    >
                        Invite
                    </Button>
                </CardActions>
            </Card>
            <SnackBar
                open={open}
                message={message}
                severity={severity}
                handleClose={()=>setOpen(false)}
            />
        </>
    )
}