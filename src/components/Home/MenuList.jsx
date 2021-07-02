import React from 'react'
import { Divider, List, ListItem, ListItemText, ListItemIcon, SvgIcon } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailIcon from '@material-ui/icons/Mail';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {ReactComponent as Tournament} from '../../assets/TournamentIcon.svg'
import {ReactComponent as Invite} from '../../assets/InviteIcon.svg'
import {ReactComponent as MatchHistory} from '../../assets/MatchHistoryIcon.svg'

export default function MenuList(props){

    return(
        <>
            <List>
                <ListItem button onClick={()=> props.tournamentsFunction() }>
                    <ListItemIcon>
                        <SvgIcon component={Tournament} viewBox='0 0 512 512'/>
                    </ListItemIcon>
                    <ListItemText primary='Tournaments' />
                </ListItem>
                <ListItem button onClick={()=> props.invitesFunction() }>
                    <ListItemIcon>
                        <SvgIcon component={Invite} viewBox='0 0 682 682'/>
                    </ListItemIcon>
                    <ListItemText primary='Invites' />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={()=> props.profileFunction() }>
                    <ListItemIcon>
                        <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary='My Profile' />
                </ListItem>
                <ListItem button onClick={()=> props.matchHistoryFunction() }>
                    <ListItemIcon>
                        <SvgIcon component={MatchHistory} viewBox='0 0 512 512'/>
                    </ListItemIcon>
                    <ListItemText primary='Invites' />
                </ListItem>
                <ListItem button onClick={()=> props.requestsFunction()}>
                <ListItemIcon>
                    <MailIcon />
                </ListItemIcon>
                    <ListItemText primary='Join Requests'/>
                </ListItem>
            </List>
            <Divider />
            <List >
                <ListItem button onClick={()=>{
                    window.localStorage.removeItem('ranked-token'); 
                    window.location.replace('/')
                }
                }>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary='Sign Out' />
                </ListItem>
            </List>
        </>
    )
}