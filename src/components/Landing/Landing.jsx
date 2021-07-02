import React, { useEffect } from 'react'
import { Typography, Container, CssBaseline } from '@material-ui/core'

export default function Landing(){
    
    useEffect(()=>{
        if (window.localStorage.getItem('ranked-token')) window.location.replace('/home')
    }, [])

    return(
        <Container>
            <Typography variant="h1">
                LANDING
            </ Typography>
        </Container>
    )
}