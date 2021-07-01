import React, { useState, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Button, TextField, Snackbar } from '@material-ui/core'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { createTournament } from '../../functions/tournaments'
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(()=>({
    detailsLabel:{
        margin: "15px 0px"
    }
}))

export default function NewTournamentForm(){
    const classes = useStyles()
    const quillRef = useRef()
    const [details, setDetails] = useState()
    const [name, setName] = useState()
    const [message, setMessage] = useState(null)
    const [severity, setSeverity] = useState()

    const submit = async (e) =>{
        e.preventDefault()
        const response = await createTournament(name, JSON.stringify(details))
        response.type === 'error' ? setSeverity('error') : setSeverity('success')
        setMessage(response.message)
    }

    return(
        <form 
            autoComplete="off"  
            style={{position: 'relative', minHeight: '70vh'}}
            onSubmit={(e) =>submit(e)}
        >
            <TextField
                name="title"
                variant="outlined"
                required={true}
                fullWidth
                id="title"
                label="Tournament Name"
                autoFocus
                onChange={(e)=> setName(e.target.value)}
            />
            <Typography className={classes.detailsLabel}>
                Add the tournament details below.
            </Typography>
            <ReactQuill
                ref={quillRef}
                theme='snow'
                readOnly={false}
                onChange={() => setDetails(quillRef.current.getEditor().getContents())}
            />
            <br />
            <br />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{position: 'absolute', bottom: 0, right: 0, marginTop: 20}}
            >
                Create Tournament
            </Button>
            {message 
            ?  <Snackbar 
                onClose={()=> setMessage(null)} 
                autoHideDuration={3000}
                open
            >
                <MuiAlert severity={severity}>{message}</MuiAlert>
            </Snackbar>
            : null}
        </form>
    )
}