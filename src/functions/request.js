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

}

export const acceptRequest = async (tournament_uuid, user_uuid)=>{

}

export const declineRequest = async (tournament_uuid, user_uuid)=>{

}

export const cancelRequest = async (tournament_uuid)=>{

}