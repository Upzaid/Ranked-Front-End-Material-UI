import React , { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import TournamentAccordion from './Tournament-Accordion/TournamentAccordion';
import { getTournamentList } from '../../../functions/tournaments'
import { deleteTournament } from '../../../functions/tournaments';

export default function ManageTournaments(){
    
    const [tournaments, setTournaments] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        fetchTournaments()
    }, [])

    // This delete function will be sent from
    // ManageTournaments >>>> TournamentAccordion >>>> TournamentEditForm
    // So that the tournament list will be updated on delete from TournamentEditFrom
    const tournamentDelete = async (tournament_uuid) =>{
        const response  = await deleteTournament(tournament_uuid)
        if (response.type === 'success'){
            setTournaments(await getTournamentList())
        }
    }

    const fetchTournaments = async ()=>{
        const response = await getTournamentList()
        setTournaments(response)
        setLoading(false)
    }

    return(
        <>
            { loading
            ? <Box style={{textAlign: 'center'}}><CircularProgress/></Box>
            : tournaments.map(tournament =>{
                return(
                    <TournamentAccordion
                        key={tournament.tournament_uuid}
                        tournament={tournament} 
                        deleteFunction={()=>tournamentDelete(tournament.tournament_uuid)}
                    />
                )
            })
            }
        </>
    )
}