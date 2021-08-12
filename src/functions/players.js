import apiURL from '../variables'

export const getPlayers = async(tournament_uuid)=>{
    const response = await fetch(`${apiURL}/tournament/registration/${tournament_uuid}`, {
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
    const data = await response.json()
    return response.ok 
    ? data
    : {message: data.message, type: 'error'} 
}

export const createPlayer =async(name, tournament_uuid)=>{
    const response = await fetch(`${apiURL}/player/${tournament_uuid}`, {
        method: 'POST',
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({name})
    })
    const data = await response.json()
    const {message}  = data
    return response.ok 
    ? {message, type: 'success'} 
    : {message, type: 'error'} 
}

export const editPlayer = async(name, tournament_uuid, player_uuid) =>{
    const response = await fetch(`${apiURL}/player/${tournament_uuid}`, {
        method: 'PUT',
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({name, player_uuid})
    })
    const data = await response.json()
    const {message}  = data
    return response.ok 
    ? {message, type: 'success'} 
    : {message, type: 'error'} 
}

export const deletePlayer = async(player_uuid, tournament_uuid) =>{
    const response = await fetch(`${apiURL}/player/${tournament_uuid}`, {
        method: 'DELETE',
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({player_uuid})
    })
    const data = await response.json()
    const {message}  = data
    return response.ok 
    ? {message, type: 'success'} 
    : {message, type: 'error'} 
}
