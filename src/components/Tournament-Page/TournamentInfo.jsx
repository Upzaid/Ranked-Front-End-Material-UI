import React, {useState} from 'react'
import { Box, CssBaseline, Toolbar, Container, Grid, Typography } from '@material-ui/core'
import { Button, AppBar, Paper, Divider} from '@material-ui/core'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css';
import { sendRequest } from '../../functions/request'
import SnackBar from '../SnackBar'
import MetaTags from '../Meta-Tags/MetaTags';


export default function TournamentInfo({tournament}){
    
    const [snackbar, setSnackbar] = useState(false)
    const [message, setMessage] = useState()
    const [severity, setSeverity] = useState()

    const send = async()=>{
        const response = await sendRequest(tournament.tournament_uuid)
        setMessage(response.message)
        setSeverity(response.type)
        setSnackbar(true)
    }

    return(
        <Box >
             <MetaTags 
                title={tournament.tournament_name}
            />
            <CssBaseline/>
            <AppBar position='sticky'>
                <Toolbar  />
            </AppBar>
            <Container maxWidth="md">
                <Paper style={{padding: 25, minHeight: '93vh'}}>
                    <br />
                    <Grid alignItems='center' container>
                        <Grid item xs={9}>
                            <Typography variant='h3'>{tournament.tournament_name}</Typography>
                            <Typography variant='subtitle1'>({tournament.status})</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Button 
                                size="large" 
                                variant='contained' 
                                color='primary'
                                onClick={()=>send()}
                            >
                                    Send A Join Request
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                    <Divider />
                    <ReactQuill
                        defaultValue={JSON.parse(tournament.details)}
                        readOnly
                        theme="bubble"
                    />
                </Paper>
            </Container>
            <SnackBar 
                open={snackbar}
                handleClose={()=> setSnackbar(false)}
                severity={severity}
                message={message}
            />
        </Box> 
    )
}