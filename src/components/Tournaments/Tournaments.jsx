import React, { useState, useEffect } from 'react'
import { Paper, Typography, Container, Tabs, Tab, AppBar } from '@material-ui/core'
import NewTournamentForm from './NewTournamentFomr';
import ManageTournaments from './ManageTournaments';

export default function Tournaments (){

    const [content, setContent] = useState(<ManageTournaments/>)
    const [value, setValue] = useState(0)

    useEffect(()=>{
    },[])

    return(
        <>
            <Typography variant="h3" color="textSecondary" style={{textAlign:'center'}}>Tournaments</Typography>
            <br />
            <Paper style={{minHeight: "80vh"}}>
                <AppBar position='static'>
                    <Tabs
                        value={value}
                        indicatorColor="secondary"
                        onChange={(e, newValue)=> setValue(newValue)}
                        variant="fullWidth"
                    >
                        <Tab label='Manage Tournaments' onClick={()=>setContent(<ManageTournaments />)}/>
                        <Tab label='Create a New Tournament' onClick={()=>setContent(<NewTournamentForm />)}/>
                    </Tabs>
                </AppBar>
                <Container>
                    <br />
                    {content}
                </Container>
            </Paper>
        </>
    )
}