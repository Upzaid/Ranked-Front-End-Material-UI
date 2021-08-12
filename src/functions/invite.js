import apiURL from '../variables'

export const sendInvite = async (tournament_uuid, user_uuid) =>{
    const response  = await fetch(`${apiURL}/invite/create/${tournament_uuid}`,{
        method: 'POST',
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({user_uuid})
    })

    const data = await response.json()
    const {message} = data
    return response.ok
    ? {message, type: 'success'}
    : {message, type: 'error'}
}

export const getTournamentInvites = async (tournament_uuid) =>{
    const response  = await fetch(`${apiURL}/invite/${tournament_uuid}`,{
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })

    const data = await response.json()
    const {message} = data
    return response.ok
    ? data
    : {message, type: 'error'}
}

export const cancelInvite = async(tournament_uuid, user_uuid)=>{
    const response  = await fetch(`${apiURL}/invite/delete/${tournament_uuid}`,{
        method: 'DELETE',
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({user_uuid})
    })

    const data = await response.json()
    const {message} = data
    return response.ok
    ? {message, type: "success"}
    : {message, type: 'error'}
}

export const acceptInvite = async(tournament_uuid)=>{
    const response  = await fetch(`${apiURL}/invite/accept`,{
        method: 'PUT',
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({tournament_uuid})
    })

    const data = await response.json()
    const {message} = data
    return response.ok
    ? {message, type: "success"}
    : {message, type: 'error'}
}

export const declineInvite = async(tournament_uuid)=>{
    const response  = await fetch(`${apiURL}/invite/decline`,{
        method: 'PUT',
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({tournament_uuid})
    })

    const data = await response.json()
    const {message} = data
    return response.ok
    ? {message, type: "success"}
    : {message, type: 'error'}
}