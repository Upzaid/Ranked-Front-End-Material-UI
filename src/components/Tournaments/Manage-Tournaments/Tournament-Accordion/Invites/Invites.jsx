import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import SearchUserForm from './SearchUserForm'
import SearchResults from './SearchResults'
import { Typography } from '@material-ui/core'
import { searchUser } from '../../../../../functions/user'


export default function Invites({tournament_uuid}){

    const [results, setResults] = useState()

    const findUser = async (username) =>{
        const response = await searchUser(username)
        if (!response.message) setResults(response)
    }

    return(
        <Container>
            <SearchUserForm 
                search={findUser}
            />
            {!results
            ? <Typography></Typography>
            : <SearchResults 
                results={results}
                tournament_uuid={tournament_uuid}
            />
            }
        </Container>
    )
}