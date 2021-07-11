import React from 'react'
import { Card, CardContent, CardActions, CardActionArea } from '@material-ui/core'
import { Typography, Button } from '@material-ui/core'

export default function UserRresultCard({user}){

    return(
        <Card variant='outlined'>
            <CardContent>
                <Typography  gutterBottom>
                    Username
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                    color="primary" 
                    size="small"
                    onClick={()=> alert('Invite player')}
                >
                    Invite
                </Button>
            </CardActions>
        </Card>
    )
}