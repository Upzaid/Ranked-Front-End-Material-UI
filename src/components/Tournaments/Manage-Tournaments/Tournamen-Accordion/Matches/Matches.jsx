import React, { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import MatchForm from './MatchForm'
import MatchHistory from './MatchHistory'
import { getPlayers } from '../../../../../functions/players'
import { getMatches } from '../../../../../functions/matches'

export default function Matches({tournament_uuid}){
    
    useEffect(()=>{
        fetchPlayers()
        fetchMatches()
    }, [])

    const [players, setPlayers] = useState([])
    const [matches, setMatches] = useState([])

    const fetchPlayers = async () => {
        const response = await getPlayers(tournament_uuid)
        if (!response.message) setPlayers(response) 
    }

    const fetchMatches = async() =>{
        const response = await getMatches(tournament_uuid)
        if (!response.message) setMatches(response)
    }

    return(
        <Box style={{paddingBottom: 40}}>
            <MatchForm  
                players={players} 
                tournament_uuid={tournament_uuid}
                getMatches={fetchMatches}
            />
            <br />
            <br />
            {matches 
            ? <MatchHistory 
                tournament_uuid={tournament_uuid} 
                matches={matches} 
                getMatches={fetchMatches}/>
            : <CircularProgress></CircularProgress>
            }
        </Box>
    )
}