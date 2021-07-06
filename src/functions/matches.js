const apiURL = process.env.REACT_APP_API_URL

export const createMatch = async(tournament_uuid, p1_uuid, p2_uuid, p1_wins, p2_wins, date)=>{
    const response = await fetch(`${apiURL}/match/submit/${tournament_uuid}`,{
         method: 'POST',
         headers: {
            'ranked-token': localStorage.getItem('ranked-token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify({p1_uuid, p2_uuid, p1_wins, p2_wins, date})
    })
    const data = await response.json()
    return response.ok 
    ? {message: data.message, type: 'success'}
    : {message: data.message, type: 'error'}
}

export const getMatches = async(tournament_uuid) =>{
    const response = await fetch(`${apiURL}/match/history/${tournament_uuid}`,{
        method: 'GET',
        headers: {
           'ranked-token': localStorage.getItem('ranked-token'),
           'Content-Type': 'application/json',
           'Accept': 'application/json'
        },
   })
   
   const data = await response.json()
   return response.ok 
   ? data
   : {message: data.message}
}

export const deleteMatch = async(tournament_uuid, match_uuid) =>{
    const response = await fetch(`${apiURL}/match/submit/${tournament_uuid}/${match_uuid}`,{
        method: 'DELETE',
        headers: {
           'ranked-token': localStorage.getItem('ranked-token'),
           'Content-Type': 'application/json',
           'Accept': 'application/json'
        }
   })
   const data = await response.json()

   return response.ok 
   ? {message: data.message, type: 'success'}
   : {message: data.message, type: 'error'}
}

export const editMatch = async(tournament_uuid, match_uuid, p1_wins, p2_wins, date) =>{
    const response = await fetch(`${apiURL}/match/submit/${tournament_uuid}/${match_uuid}`,{
        method: 'PUT',
        headers: {
           'ranked-token': localStorage.getItem('ranked-token'),
           'Content-Type': 'application/json',
           'Accept': 'application/json'
        },
        body: JSON.stringify({p1_wins, p2_wins, date})
   })
   const data = await response.json()

   return response.ok 
   ? {message: data.message, type: 'success'}
   : {message: data.message, type: 'error'}
}