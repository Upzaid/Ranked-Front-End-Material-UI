import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Container, Grid, Toolbar } from '@material-ui/core';
import { Card, CardContent } from '@material-ui/core';
import ScreenShot1 from '../../assets/ScreenShot1.png'
import ScreenShot2 from '../../assets/ScreenShot2.png'
// import ScreenShot3 from '../../assets/ScreenShot3.png'

const apiURL = process.env.REACT_APP_API_URL

function DescriptionCardLeft({title, text, image}){
  return(
    <Card style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <CardContent>
        <Typography variant='h4' color='textSecondary'>{title}</Typography>
        <Typography variant='subtitle1' color='textSecondary'>{text}</Typography>
      </CardContent>
      <img src={image} style={{maxHeight: 300}} alt="" />
    </Card>
  )
}
function DescriptionCardRight({title, text, image}){
  return(
    <Card style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <img src={image} style={{maxHeight: 300}} alt="" />
      <CardContent>
        <Typography variant='h4' color='textSecondary'>{title}</Typography>
        <Typography variant='subtitle1' color='textSecondary'>{text}</Typography>
      </CardContent>
    </Card>
  )
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        RANKD.gg
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    textAlign: 'center'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  cover: {
    width: 151,
  },
}));

export default function Landing() {
  const classes = useStyles();

  useEffect(()=>{
    signIn()
  },[])

  const signIn = async ()=>{
    const response = await fetch(`${apiURL}/user/jwt`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ranked-token': localStorage.getItem('ranked-token')
      }
    })
    if(response.ok) window.location.replace('/home')
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              RANKED.gg
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              A free tool designed to create and manage league tournaments based on the Elo Rating System.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Link href='/register'>
                      <Button variant="contained" color="primary">
                        Register
                      </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/sign-in'>
                      <Button variant="outlined" color="primary">
                        Sign In
                      </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <DescriptionCardLeft
            title="Tournament Management"
            image={ScreenShot1}
            text="Create and manage multiple tournaments, add details and invite players."
          />
          <br />
          <DescriptionCardRight
            title="Analize"
            image={ScreenShot2}
            text="Track your progress, the progress of players in your tournaments and look at their match history."
          />
          <br />
          <Box style={{textAlign: 'center'}}>
            <Link href='/register'>
              <Button variant="contained" color="primary" size='large'>
                Get Started
              </Button>
            </Link>
          </Box>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        {/* <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography> */}
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}