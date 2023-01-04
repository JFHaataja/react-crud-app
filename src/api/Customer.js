import axios from 'axios';

// second localhost baseUrl is for testing purposes (remember to comment it out when done testing)

//  const baseUrl = "https://backendnw.azurewebsites.net/nw/customer"
const baseUrl = 'https://localhost:7109/nw/customer';

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

const create = (newCustomer) => {
    const config = {
        headers: { Authorization: token },
    };

    return axios.post(baseUrl, newCustomer, config);
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

    return axios.put(`${baseUrl}/${object.customerId}`, object, config);
};

export default { setToken, getAll, create, remove, update };
