import axios from 'axios';

const getBaseUrl = () => {

    if (window.location.host === 'localhost:3000') {
        return 'http://localhost:8000';
    }
};

const api = axios.create({
    baseURL: getBaseUrl(),
    'Content-Encoding': 'gzip',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    config => configure(config),
    error => Promise.reject(error)
);

api.interceptors.response.use(function (response) {
    if (response.headers['x-version'] > process.env.VERSION) {
        window.location.reload();
    }
    return response; // continue with response
});
const configure = config => {

    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const token = localStorage.getItem('token');
    const _userId = localStorage.getItem('_userId');

    if (token != null) {
        config.headers.Authorization = token;
    }
    if (config.method === 'get') {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    config.headers['firstName'] = firstName;
    config.headers['lastName'] = lastName;
    config.headers['_userId'] = _userId;
    return config;
};

export default api;
