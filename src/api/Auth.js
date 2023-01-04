import axios from 'axios';

// bottom baseUrl is for testing the app while back end app is running in local host

const baseUrl = process.env.REACT_APP_BASE_URL_AUTH
// const baseUrl = process.env.REACT_APP_BASE_URL_AUTH_LOCAL

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth);
    return request.then((response) => response);
};

export default { authenticate };
