const apiURL = process.env.REACT_APP_API_URL

export const getUserData = async ()=>{
    const response  = await fetch(`${apiURL}/user/data`,{
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })

    const data = await response.json()
    
    return response.ok
    ? data
    : {message: data.message}
}

export const editUser = async (first_name, last_name, email)=>{
    const response  = await fetch(`${apiURL}/user/edit`,{
        method: 'PUT',
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({first_name, last_name, email})
    })

    const data = await response.json()
    const {message} = data
    return response.ok
    ? {message, type:'success'}
    : {message, type:"error"}
}

export const searchUser = async(username)=>{
    const response  = await fetch(`${apiURL}/user/search?username=${username}`,{
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })

    const data = await response.json()

    return data.message
    ? {message: data.message}
    : data
}

export const getUserTournaments = async()=>{
    const response  = await fetch(`${apiURL}/user/tournaments`,{
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })

    const data = await response.json()

    return data.message
    ? {message: data.message}
    : data
}

export const getUserInvites = async() =>{
    const response  = await fetch(`${apiURL}/user/invites`,{
        headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })

    const data = await response.json()

    return data.message
    ? {message: data.message}
    : data
}