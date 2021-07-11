import React from 'react'
import { TextField, Button } from '@material-ui/core'

export default function SearchUserForm({search}){
    
    

    return(
        <form onSubmit={(e)=> {e.preventDefault(); search()}} style={{paddingBottom: 40}}>
            <TextField 
                label='Username'
            />
            <Button
                type='submit'
                color="secondary"
                variant="contained"
                size="large"
            >
                Find Users
            </Button>
        </form>
    )
}