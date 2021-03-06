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
    const [sortOrder, setSortOrder] = useState({
        date: false,
        p1_name: false,
        p2_name: false
    })


    const fetchPlayers = async () => {
        const response = await getPlayers(tournament_uuid)
        if (!response.message) setPlayers(response) 
    }

    const fetchMatches = async() =>{
        const response = await getMatches(tournament_uuid)
        if (!response.message) setMatches(response)
    }

    const sortColumns = (sortKey) =>{
        const sortedMatches = [...matches]
        sortedMatches.sort((a, b) =>{
            if (a[sortKey] > b[sortKey]) return sortOrder[sortKey] ? 1 : -1
            if (a[sortKey] < b[sortKey]) return sortOrder[sortKey] ? -1 : 1
            return 0
        })
        sortOrder[sortKey] = !sortOrder[sortKey]
        setSortOrder(sortOrder)
        setMatches(sortedMatches)
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
                getMatches={fetchMatches}
                sortColumns={sortColumns}
                />
            : <CircularProgress></CircularProgress>
            }
        </Box>
    )
}