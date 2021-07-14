import React, { useState, useEffect} from 'react'
import { Typography, Paper, Button, Container, makeStyles, CircularProgress, Box } from '@material-ui/core'
import ProfileField from './ProfileField'
import GenericDialog from '../GenericDialog'
import SnackBar from '../SnackBar'
import { getUserData, editUser } from '../../functions/user'

const useStyles = makeStyles(theme=>({
    root: {
        '& > *': {
          borderBottom: 'unset',
        },
      },
      delete:{
          borderColor: theme.palette.error.main,
          color: theme.palette.error.main,
          '&:hover':{
              backgroundColor: "#ffebee"
          }
      }
}))

export default function Profile(){
    
    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = ()=>{
        getUserData()
        .then(data=>{
            setUser(data)
            setUsername(data.username)
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setEmail(data.email)
        })
    }

    const saveChanges = async ()=>{
        const response = await editUser(firstName, lastName, email)
        setMessage(response.message)
        setSeverity(response.type)
        setSnackbar(true)
        setDialog(false)
    }

    const classes = useStyles()
    
    const [dialog, setDialog] = useState(false)
    const [snackbar, setSnackbar] = useState(false)
    const [message, setMessage] = useState()
    const [severity, setSeverity] = useState('error')
    const [user, setUser] = useState()
    
    const [username, setUsername] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    
    return(
        <>
            <Typography variant="h3" color="textSecondary" style={{textAlign:'center'}}>My Profile</Typography>
            <br />
            <Paper style={{minHeight: '80vh'}}>
                <br />
                {!user
                ? <Box style={{textAlign: 'center'}}>
                    <CircularProgress />
                </Box>
                :<>
                    <form onSubmit={(e)=> e.preventDefault()} style={{position: 'relative', height: '80vh'}}>
                        <Container >
                            {/* <ProfileField
                                label="Username"
                                value={username}
                                onChange={(e)=>{setUsername(e.target.value)}}
                            /> */}
                            <ProfileField
                                label="First Name"
                                value={firstName}
                                onChange={(e)=>{setFirstName(e.target.value)}}
                            />
                            <ProfileField
                                label="Last Name"
                                value={lastName}
                                onChange={(e)=>{setLastName(e.target.value)}}
                            />
                            <ProfileField
                                label="E-mail"
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}
                            />
                        </Container>
                        <Button
                            type="submit"
                            variant="outlined"
                            style={{position:"absolute", bottom: 10, right: 10}}
                            onClick={()=> setDialog(true)}
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant="outlined"
                            className={classes.delete}
                            style={{position:"absolute", bottom: 10, left: 10}}
                            onClick={()=> fetchData()}
                        >
                            Discard Changes
                        </Button>
                    </form>
                    {dialog
                    ? <GenericDialog 
                        open={dialog}
                        message='Do you wish to save the changes?'
                        onCancel={()=>setDialog(false)}
                        handleClose={()=>setDialog(false)}
                        onConfirm={()=> saveChanges()}
                        confirmLabel="Save"
                    />
                    : null
                    }
                    {snackbar
                    ? <SnackBar
                        open={snackbar}
                        handleClose={()=>setSnackbar(false)}
                        message={message}
                        severity={severity}                      
                    />
                    : null
                    }
                </>
                }
            </Paper>
        </>
    )
}