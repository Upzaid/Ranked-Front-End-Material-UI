const apiURL = process.env.REACT_APP_API_URL

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