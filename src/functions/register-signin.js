import apiURL from '../variables'

export const register = async (first_name, last_name, username, email, password) =>{
    
    try {
        const response = await fetch(`${apiURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({
                first_name,
                last_name,
                username,
                password,
                email
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        if (response.ok) return await response.json()
        return {error: await response.text() || await response.json()}
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async (email, password) =>{
    try {
        const response = await fetch(`${apiURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        if (response.ok) return await response.json()
    
        return {error: await response.text() || await response.json()}
    } catch (error) {
        console.error(error)
    }
}