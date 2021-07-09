import React, { useState, useEffect} from 'react'
import { Container, Typography, Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core'
import { Tabs, Tab, Grid} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TournamentEditForm from './TournamentEditFrom'
import Players from './Players/Players'
import Matches from './Matches/Matches'



export default function TournamentAccordion({tournament, deleteFunction}){
    const [value, setValue] = useState(0)
    const [content, setContent] = useState(<TournamentEditForm tournament = {tournament} deleteFunction={()=>deleteFunction()}/>)

    return(
        <Accordion key={tournament.tournament_uuid}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Grid container >
                    <Grid item xs={9}>
                        <Typography noWrap>{tournament.tournament_name} </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>{tournament.create_date.split('T')[0]}</Typography>
                    </Grid>      
                </Grid>
            </AccordionSummary>
            <AccordionDetails >
                <Tabs
                     value={value}
                     indicatorColor="primary"
                     onChange={(e, newValue)=> setValue(newValue)}
                     variant="fullWidth"
                >
                    <Tab label='Edit Tournament' onClick={()=> setContent(<TournamentEditForm tournament={tournament} deleteFunction={deleteFunction}/>)}/>
                    <Tab label='Players'onClick={()=> setContent(<Players tournament_uuid={tournament.tournament_uuid} />)}/>
                    <Tab label='Matches'onClick={()=> setContent(<Matches tournament_uuid={tournament.tournament_uuid}/>)}/>
                    <Tab label='Invite a Player'onClick={()=> setContent('Send Inivte')}/>
                </Tabs>
            </AccordionDetails>
                <Container >
                    {content}
                </Container>
        </Accordion>
    )
}