import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL_USER;

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    };

    const request = axios.get(baseUrl, config);
    return request.then((response) => response.data);
};

const create = (newUser) => {
    const config = {
        headers: { Authorization: token },
    };
    return axios.post(baseUrl, newUser, config);
};

const remove = (id) => {
    const config = {
        headers: { Authorization: token },
    };
    return axios.delete(`${baseUrl}/${id}`, config);
};

const update = (object) => {
    const config = {
        headers: { Authorization: token },
    };
    return axios.put(`${baseUrl}/${object.userId}`, object, config);
};

export default { setToken, getAll, create, remove, update };
