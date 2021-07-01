const apiURL = process.env.REACT_APP_API_URL

export const createTournament = async(name, details) =>{
    const response = await fetch(`${apiURL}/tournament/create`, {
        method: 'POST',
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({name, details})
    })
    const data = await response.json()
    const message = data.message

    return response.ok 
    ? {message, type: 'success'} 
    : {message, type: 'error'}
}

export const deleteTournament =async (tournament_uuid)=>{
    const response = await fetch(`${apiURL}/tournament/${tournament_uuid}`, {
        method: 'DELETE',
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
    const data = await response.json()
    console.log(data)
    if (response.ok) {
        return {message: data.message, type: 'success'}
    }
    return {message: data.message, type: 'error'}
}

export const editTournament = async(tournament_uuid, name, details, status)=>{
    const response = await fetch(`${apiURL}/tournament/${tournament_uuid}`, {
        method: 'PUT',
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({name, details, status})
    })
    const data = await response.json()
    if (response.ok) {
        return {message: data.message, type: 'success'}
    }
    return {message: data.message, type: 'error'}
        
}

export const getTournamentList = async () =>{
    const response = await fetch(`${apiURL}/tournament/list`, {
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
    if (response.ok) return await response.json()
    const data = await response.json()
    return ({message: data.message})
}
