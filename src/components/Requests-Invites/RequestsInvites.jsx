import React, { useState } from 'react'
import { Paper, Typography, Box, Tab, Tabs, AppBar, Container } from '@material-ui/core'
import Invites from './Invites'
import Requests from './Requests'

export default function RequestsInvites (){
    
    const [content, setContent] = useState(<Invites />)
    const [value, setValue] = useState(0)

    return(
        <Box>
            <Typography color="textSecondary" variant='h3' style={{textAlign: 'center'}}>Inivtes & Requests</Typography>
            <br />
            <Paper style={{minHeight: '80vh'}}>
                <AppBar position='static'>
                    <Tabs
                        value={value}
                        indicatorColor="secondary"
                        onChange={(e, newValue)=> setValue(newValue)}
                        variant="fullWidth"
                    >
                        <Tab label='Tournament Invites' onClick={()=>setContent(<Invites />)}/>
                        <Tab label='Join Requests' onClick={()=>setContent(<Requests />)}/>
                    </Tabs>
                </AppBar>
                <Container style={{paddingBottom: 40}}>
                    <br />
                    {content}
                </Container>
            </Paper>
        </Box>
    )
}