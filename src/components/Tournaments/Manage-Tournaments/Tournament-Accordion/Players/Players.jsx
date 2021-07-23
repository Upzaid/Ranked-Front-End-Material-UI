import React, { useState, useEffect }  from 'react'
import LocalPlayerForm from './LocalPlayerForm'
import PlayerList from './PlayerList'
import { Box, CircularProgress, Container } from '@material-ui/core'
import { getPlayers } from '../../../../../functions/players'

export default function Players({tournament_uuid}){

    const [players, setPlayers] = useState([])
    
    const [sortOrder, setSortOrder] = useState({
        rating: false,
        name: false,
        player_type: false
    })

    useEffect(()=>{
        fetchPlayers()
    }, [])

    const fetchPlayers = async () => {
        const response = await getPlayers(tournament_uuid)
        if (!response.message) setPlayers(response) 
    }

    const sortColumn = (sortKey) =>{
        const sortedPlayers = [...players]

        sortedPlayers.sort((a, b)=>{
            if (a[sortKey] > b[sortKey]) return sortOrder[sortKey] ? 1 : -1
            if (a[sortKey] < b[sortKey]) return sortOrder[sortKey] ? -1 : 1
            return 0
        })
        sortOrder[sortKey] = !sortOrder[sortKey]
        setSortOrder(sortOrder)
        setPlayers(sortedPlayers)
    }

    const sortRating = ()=>{
        const sortedPlayers = [...players]

        sortedPlayers.sort((a, b) =>{
            if (a.matches[a.matches.length - 1].player_rating > b.matches[b.matches.length - 1].player_rating){
                return sortOrder.rating ? 1 : -1
            }
            if (a.matches[a.matches.length - 1].player_rating < b.matches[b.matches.length - 1].player_rating){
                return sortOrder.rating ? -1 : 1
            }
            return 0
        })
        sortOrder.rating = !sortOrder.rating
        setSortOrder(sortOrder)
        setPlayers(sortedPlayers)
    }

    return(
        <Box style={{paddingBottom: 40}}>
            <LocalPlayerForm tournament_uuid={tournament_uuid} getPlayers={fetchPlayers}/>
            <br />
            <br />
            {!players 
            ? <Container style={{textAlign: 'center'}}><CircularProgress /></Container>
            : <PlayerList
                sortRating={sortRating}
                sortColumn={sortColumn}
                players={players} 
                tournament_uuid={tournament_uuid} 
                getPlayers={fetchPlayers}/>
            }
        </Box>
    )
}