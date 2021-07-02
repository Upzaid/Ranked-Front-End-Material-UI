import React, { useState, useRef } from 'react'
import ReactQuill from 'react-quill'
import { Button, TextField, Snackbar, Select, MenuItem, Typography, makeStyles } from '@material-ui/core'
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { editTournament } from '../../../../functions/tournaments';

const useStyles = makeStyles(theme=>({
    delete:{
        backgroundColor: theme.palette.error.main,
        '&:hover':{
            backgroundColor: theme.palette.error.dark
        }
    }
}))

export default function TournamentEditForm ({tournament, deleteFunction}){
    const classes = useStyles()
    const quillRef = useRef()
    const [name, setName] = useState(tournament.tournament_name)
    const [details, setDetails] = useState(JSON.parse(tournament.details))
    const [status, setStatus] = useState(tournament.status)
    const [message, setMessage] = useState()
    const [severity, setSeverity] = useState()
    const [dialog, setDialog] = useState(false)

    const submit = async(e) =>{
        e.preventDefault()
        const response = await editTournament(tournament.tournament_uuid, name, JSON.stringify(details), status)
        setSeverity(response.type === 'success' ? 'success' : 'error')
        setMessage(response.message)
    }
    
    return (
        <form
            noValidate
            autoComplete="off"  
            style={{position: 'relative', minHeight:'50vh'}} 
            onSubmit={e=>submit(e)}
        >
            <TextField
                 name="title"
                 required={true}
                 fullWidth
                 id="title"
                 label="Tournament Name"
                 autoFocus
                 value={name}
                 onChange={(e)=> setName(e.target.value)}
                 style={{margin:'20px 0'}}
            >
            </TextField>
                <Typography variant='subtitle1'>Status:</Typography>
                <Select
                    value={status}
                    onChange={(e)=> setStatus(e.target.value)}
                >
                    <MenuItem value='Active'>Active</MenuItem>
                    <MenuItem value='Concluded'>Concluded</MenuItem>
                </Select>
            <br />
            <br />
            <ReactQuill
                ref={quillRef}
                theme='snow'
                readOnly={false}
                defaultValue={details}
                onChange={() => setDetails(quillRef.current.getEditor().getContents())}
            />
            <br />
            <br />
            <br />
            <Button
                className={classes.delete}
                variant="contained"
                color="primary"
                style={{position: 'absolute', bottom: 10, left: 0, marginTop: 20}}
                onClick={()=> setDialog(true)}
             >
                Delete Tournament
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{position: 'absolute', bottom: 10, right: 0, marginTop: 20}}
            >
                Save Changes
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
            { dialog 
            ? <Dialog
                open={dialog}
                onClose={()=> setDialog(false)}
            >
                <DialogTitle>Do you wish to delete this tournament?</DialogTitle>
                <DialogActions>
                    <Button color='primary' onClick={()=>{deleteFunction(); setDialog(false)}}>
                        Delete
                    </Button>
                    <Button color='primary' onClick={()=>setDialog(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            : null
            }
        </form>
    )
}