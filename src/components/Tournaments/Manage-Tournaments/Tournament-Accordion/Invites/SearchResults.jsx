import { Typography, Box, Grid } from '@material-ui/core'
import React from 'react'
import UserRresultCard from './UserResultCard'

export default function SearchResults({results}){
    return(
        
        <Box style={{paddingBottom: 40}}>
            { results.length === 0
            ? <Typography>We could not find any matching results. Try again.</Typography>
            : <Grid container spacing={2}>
                {results.map(user =>{
                    return (
                        <Grid key={user.user_uuid} item xs={2}>
                            <UserRresultCard 
                                user={user}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            }
        </Box>
    
    )
}