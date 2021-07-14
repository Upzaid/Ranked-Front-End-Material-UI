import React from 'react'
import {Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlayerHistoryTable from '../Tournaments/Manage-Tournaments/Tournament-Accordion/Players/PlayerHistoryTable'

export default function UserTournamentAccordion({tournament}){
    
    return(
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container >
                    <Grid item xs={8}>
                        {tournament.tournament_name}
                    </Grid>
                    <Grid item xs={2}>
                        Matches Played: 
                    </Grid>
                    <Grid item xs={2}>
                        Rating: 
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails style={{textAlign: 'center'}}>
                <Grid container justify="center">
                    <PlayerHistoryTable matches={[]}/>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}