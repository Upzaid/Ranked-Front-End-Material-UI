import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Dialog, DialogContentText, DialogContent } from '@material-ui/core';
import { register } from '../../functions/register-signin'
import MetaTags from '../Meta-Tags/MetaTags';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfrim] = useState('')
  const [message, setMessage] = useState('')

  const submit = async (e) =>{
    e.preventDefault()
    if (password !== passwordConfirm) return setMessage('Passwords must be the same.')
    
    const response = await register(firstName, lastName, username, email, password)
    
    if (response.error) return setMessage(response.error)
    setMessage(response)    
    setTimeout(()=>{ window.location.href ='/sign-in' }, 1500)
  }

  return (
    <Container component="main" maxWidth="xs">
      <MetaTags 
            title="Register"
            descirption="Create a new RANKD.gg account so you can start organizing tournaments."
      />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form 
            className={classes.form} 
            onSubmit={submit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required={true}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e)=> setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e)=> {setLastName(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={(e)=> {setUsername(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=> {setEmail(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=> {setPassword(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password-confirm"
                label="Confirm Password"
                type="password"
                id="password-confirm"
                autoComplete="password-confirm"
                onChange={(e)=> {setPasswordConfrim(e.target.value)}}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {message 
      ? <Dialog open onClose={()=> setMessage(null)}>
          <DialogContent>
              <DialogContentText >
                  {message}
              </DialogContentText>
          </DialogContent>
      </Dialog>
      : null}
    </Container>
  );
}