import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import SearchUserForm from './SearchUserForm'
import SearchResults from './SearchResult'
import { Typography } from '@material-ui/core'


export default function Invite(){

    const [results, setResults] = useState([1, 2, 3, 4, 5, 6 ,7 ])


    const searchUsers = () =>{
        alert('hola')
    }

    return(
        <Container>
            <SearchUserForm 
                search={searchUsers}
            />
            {!results
            ? <Typography>User search</Typography>
            : <SearchResults 
                results={results}
            />
            }

            
        </Container>
    )
}