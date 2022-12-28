import axios from 'axios'

const baseUrl = "https://backendnw.azurewebsites.net/nw/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }