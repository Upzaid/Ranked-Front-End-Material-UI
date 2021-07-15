import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import SignIn from './components/Sign-In/SignIn'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'

const theme = createTheme({
    palette: {
        primary: indigo,
        secondary: {
            main: '#88abb8'
        }
    }
})

export default function Routes(){
    return(
        <ThemeProvider theme={theme}>
            <Router>
                <Route path='/' exact  component={Landing}/>
                <Route path='/Home' exact  component={Home}/>
                <Route path='/sign-in' exact  component={SignIn}/>
                <Route path='/register' exact  component={Register}/>
            </Router>
        </ThemeProvider>
    )
}