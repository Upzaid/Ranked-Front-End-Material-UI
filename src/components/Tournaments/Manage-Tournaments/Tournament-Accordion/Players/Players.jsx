import React, { useState, useEffect }  from 'react'
import LocalPlayerForm from './LocalPlayerForm'
import PlayerList from './PlayerList'
import { Box, CircularProgress, Container } from '@material-ui/core'
import { getPlayers } from '../../../../../functions/players'

export default function Players({tournament_uuid}){

    const [players, setPlayers] = useState([])

    useEffect(()=>{
        fetchPlayers()
    }, [])

    const fetchPlayers = async () => {
        const response = await getPlayers(tournament_uuid)
        if (!response.message) setPlayers(response) 
    }
  
    return(
        <Box style={{paddingBottom: 40}}>
            <LocalPlayerForm tournament_uuid={tournament_uuid} getPlayers={fetchPlayers}/>
            <br />
            <br />
            {!players 
            ? <Container style={{textAlign: 'center'}}><CircularProgress /></Container>
            : <PlayerList players={players} tournament_uuid={tournament_uuid} getPlayers={fetchPlayers}/>
            }
        </Box>
    )
}