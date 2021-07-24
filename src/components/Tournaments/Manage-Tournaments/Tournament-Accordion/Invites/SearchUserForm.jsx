import React, { useState} from 'react'
import { TextField, Button, Grid } from '@material-ui/core'

export default function SearchUserForm({search}){
    
    const [username, setUsername] = useState()

    return(
        <form onSubmit={(e)=> {e.preventDefault(); search(username)}} style={{paddingBottom: 40}}>
            <Grid container spacing={4}>
                <Grid item >
                    <TextField
                        label='Username'
                        required
                        onChange={(e)=> setUsername(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button
                        type='submit'
                        color="primary"
                        variant="contained"
                        size="large"
                    >
                        Find User
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}