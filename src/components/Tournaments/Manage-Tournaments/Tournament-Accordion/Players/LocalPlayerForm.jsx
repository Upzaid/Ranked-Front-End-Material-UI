import React, { useState } from 'react'
import { Typography, TextField, Grid, Container, Button, Snackbar} from '@material-ui/core'
import { createPlayer } from '../../../../../functions/players'
import MuiAlert from '@material-ui/lab/Alert';


export default function LocalPlayerForm({getPlayers, tournament_uuid}){
    const [name, setName] = useState()
    const [message, setMessage] = useState()
    const [severity, setSeverity] = useState()
    
    const submit = async (e)=>{
        e.preventDefault()
        const response = await createPlayer(name, tournament_uuid)
        setSeverity(response.type)
        setMessage(response.message)
        if (response.type==="success"){
            getPlayers()
        }
    }

    return(
        <Container>
            <form onSubmit={(e)=> submit(e)}>
                <Typography variant='h6'>Add a new player.</Typography>
                <Grid container>
                    <Grid item xs={9}>
                        <TextField 
                            required 
                            label="Player Name"
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant='contained' 
                                type="submit" 
                                color="primary"
                        >  
                            Add Player
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {message 
            ?  <Snackbar 
                onClose={()=> setMessage(null)} 
                autoHideDuration={3000}
                open
            >
                <MuiAlert severity={severity}>{message}</MuiAlert>
            </Snackbar>
            : null}
        </Container>
    )
}