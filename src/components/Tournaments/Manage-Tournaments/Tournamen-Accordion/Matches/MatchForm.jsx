import React, { useState} from 'react'
import { Container, Grid, TextField, Button, MenuItem } from '@material-ui/core'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { createMatch } from '../../../../../functions/matches'
import SnackBar from '../../../../SnackBar'

export default function MatchForm ({players, tournament_uuid, getMatches}){
    
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [player1, setPlayer1] =useState()
    const [player2, setPlayer2] =useState()
    const [p1wins, setP1wins] =useState()
    const [p2wins, setP2wins] =useState()
    const [success, setSuccess] = useState(false)

    
    const submit = async()=>{
        const response = await createMatch(tournament_uuid, player1, player2, p1wins, p2wins, date)
        if (response.type === 'success'){
            setSuccess(true)
            getMatches()
        }
    }

    return(
        <Container >
            <Button
                size="large"
                onClick={()=> setOpen(true)}
                variant="contained"
                color="primary"
            >
                Add a new match
            </Button>
            {open
            ? <Dialog
                open={open}
                onClose={()=> setOpen(false)}
            
            >
                <DialogTitle>
                    Add a New Match
                </DialogTitle>
                <DialogContent>
                    <Grid container xs={12} spacing={10} style={{textAlign: 'center'}}>
                        <Grid item xs={12} >
                            <TextField
                                type='date'
                                label="Date"
                                defaultValue={date}
                                onChange={(e)=> setDate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                select
                                label="Player 1"
                                fullWidth
                                required
                                onChange={(e)=> setPlayer1(e.target.value)}

                            >
                                {players.map(player=>{
                                    return(
                                    <MenuItem key={player.player_uuid} value={player.player_uuid}>
                                        {player.name}
                                    </MenuItem>
                                    )
                                })}
                            </TextField>
                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                select
                                label="Player 2"
                                fullWidth
                                required
                                onChange={(e)=> setPlayer2(e.target.value)}

                            >
                                  {players.map(player=>{
                                    return(
                                    <MenuItem key={player.player_uuid} value={player.player_uuid}>
                                        {player.name}
                                    </MenuItem>
                                    )
                                })}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                fullWidth 
                                type="number"
                                label="Player 1 Wins" 
                                required
                                onChange={(e)=> setP1wins(e.target.value)}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                fullWidth 
                                type="number"
                                label="Player 2 Wins" 
                                required
                                onChange={(e)=> setP2wins(e.target.value)}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DialogActions>
                                <Button 
                                    color="primary"
                                    onClick={()=> submit()}
                                >
                                        SAVE
                                </Button>
                                <Button 
                                    color="primary" 
                                    onClick={()=> setOpen(false)}
                                >
                                        CANCEL
                                </Button>
                            </DialogActions>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            : null
            }
            {success 
            ? <SnackBar 
                open={success} 
                message="Match added successfully"
                severity="success"
                handleClose={()=>setSuccess(false)}
            />
            : null
            }
        </Container>
    )
}