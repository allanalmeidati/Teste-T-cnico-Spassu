import axios from 'axios';


// Use diretamente o valor de REACT_APP_BACKEND_API
const baseURL ='http://127.0.0.1:80/api';

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.response.use(function (response) {
    console.log(response);
    return response;
}, function (error) {

    return Promise.reject(error);
});

export default api;
