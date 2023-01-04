import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL_AUTH

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth);
    return request.then((response) => response);
};

export default { authenticate };
