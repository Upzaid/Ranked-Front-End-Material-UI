import React, { useState, useEffect } from 'react'
import {Accordion, AccordionSummary, AccordionDetails, Grid, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlayerHistoryTable from '../Tournaments/Manage-Tournaments/Tournament-Accordion/Players/PlayerHistoryTable'
import { getUserTournamentMatches } from '../../functions/user'

export default function UserTournamentAccordion({tournament}){
    
    const [matches, setMatches] = useState([])

    useEffect(()=>{
        fetchMatches()
    },[])

    const fetchMatches = async ()=>{
        const response = await getUserTournamentMatches(tournament.tournament_uuid)
        if(!response.message) setMatches(response)
    }

    return(
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container >
                    <Grid item xs={8}>
                        {tournament.tournament_name}
                    </Grid>
                    <Grid item xs={2}>
                        {matches.length} Matches Played
                    </Grid>
                    <Grid item xs={2}>
                        Rating: 
                        {matches.length > 0 
                        ? matches[matches.length - 1].player_rating
                        : 1200
                        }
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails style={{textAlign: 'center'}}>
                <Grid container justify="center">
                    {matches.length < 1
                    ? <Typography>You have not played any matches in this tournament.</Typography>
                    :<PlayerHistoryTable matches={matches}/>
                    }
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}