import axios from 'axios';

// second localhost baseUrl is for testing purposes (remember to comment it out when done testing)

// const baseUrl = "https://backendnw.azurewebsites.net/nw/authentication"
const baseUrl = 'https://localhost:7109/nw/authentication';

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth);
    return request.then((response) => response);
};

export default { authenticate };
