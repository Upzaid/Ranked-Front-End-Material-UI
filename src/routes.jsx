import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import SignIn from './components/Sign-In/SignIn'
import Register from './components/Register/Register'

export default function Routes(){
    return(
        <Router>
            <Route path='/' exact  component={Landing}/>
            <Route path='/sign-in' exact  component={SignIn}/>
            <Route path='/register' exact  component={Register}/>
        </Router>
    )
}