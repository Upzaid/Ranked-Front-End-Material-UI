const apiURL = process.env.REACT_APP_API_URL

export const sendRequest = async (tournament_uuid)=>{
    const response  = await fetch(`${apiURL}/request/create/${tournament_uuid}`,{
        method: 'POST',
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })

    const data = await response.json()
    const {message} = data
    return response.ok
    ? {message, type: 'success'}
    : {message, type: 'error'}
}

export const getTournamentRequests = async(tournament_uuid)=>{
    const response  = await fetch(`${apiURL}/request/${tournament_uuid}`,{
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })

    return await response.json()
}

export const acceptRequest = async (tournament_uuid, user_uuid)=>{
    const response  = await fetch(`${apiURL}/request/accept/${tournament_uuid}`,{
        method: 'PUT',
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

export const declineRequest = async (tournament_uuid, user_uuid)=>{
    const response  = await fetch(`${apiURL}/request/decline/${tournament_uuid}`,{
        method: 'PUT',
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

export const cancelRequest = async (tournament_uuid)=>{

}