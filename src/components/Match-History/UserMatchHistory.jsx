import React, {useState, useEffect} from 'react'
import { Paper, Typography, Container, CircularProgress, Box } from '@material-ui/core'
import UserTournamentAccordion from './UserTournamentAccordion'
import { getUserTournaments } from '../../functions/user'
import MetaTags from '../Meta-Tags/MetaTags'

export default function UserMatchHistory (){
    
    useEffect(()=>{
        fetchTournaments()
    },[])

    const [tournaments, setTournaments] = useState()
    
    const fetchTournaments = async ()=>{
        const response = await getUserTournaments()
        if (!response.message) setTournaments(response)
    }

    return(
        <>
             <MetaTags 
                title="RANKD.gg | Match History"
            />
            <Typography color="textSecondary" variant='h3' style={{textAlign: 'center'}}>My Match History</Typography>
            <br />
            <Paper style={{paddingBottom: 40, minHeight: '80vh'}}>
            {!tournaments
            ? <Box style={{textAlign: 'center'}}><CircularProgress /></Box>
            : <Container style={{justifyContent: 'center'}}>
                <br />
                {tournaments.length > 0
                ? tournaments.map(tournament=>{
                    return(
                        <UserTournamentAccordion tournament={tournament}/>
                    )
                })
                : <Typography>You have not joined any tournaments.</Typography>
                }
            </Container>
            }
            </Paper>
        </>
    )
}