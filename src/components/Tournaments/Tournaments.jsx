import React, { useState, useEffect } from 'react'
import { Paper, Typography, Container, Tabs, Tab, AppBar } from '@material-ui/core'
import NewTournamentForm from './NewTournamentForm';
import ManageTournaments from './Manage-Tournaments/ManageTournaments';
import MetaTags from '../Meta-Tags/MetaTags';

export default function Tournaments (){

    const [content, setContent] = useState(<ManageTournaments/>)
    const [value, setValue] = useState(0)

    useEffect(()=>{
    },[])

    return(
        <>
            <MetaTags 
                title="RANKD.gg | Tournaments"
            />
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
                <Container style={{paddingBottom: 40}}>
                    <br />
                    {content}
                </Container>
            </Paper>
        </>
    )
}