import React, { useState, useEffect } from  'react'
import {useParams} from 'react-router-dom'
import { Box, Typography} from '@material-ui/core'
import TournamentInfo from './TournamentInfo'
import { getTournamentInfo } from '../../functions/tournaments'

export default function TournamentPage (){

    const { tournament_uuid } = useParams()
    
    const [tournament, setTournament] = useState()
    

    useEffect(()=>{
        fetchTournament()
    }, [])

    const fetchTournament = async()=>{
        const response = await getTournamentInfo(tournament_uuid)
        console.log(response)
        if (!response.message) setTournament(response)
    }

    return(
        !tournament
        ? <Box>
            <Typography style={{textAlign: 'center'}} variant="h3">Oops... It seems you got lost</Typography>
            <Typography style={{textAlign: 'center'}} variant="h4">There's nothing here</Typography>
        </Box>
        :<TournamentInfo tournament={tournament}/>
    )
}