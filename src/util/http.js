import axios from 'axios';

const http = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}/vc-settlment/v1`,
});
http.interceptors.request.use((config) => {
    const setConfig = config;
    setConfig.headers['Content-type'] = 'application/json;charset=UTF-8';
    return setConfig;
});
http.interceptors.response.use((response) => {
    if (response.status === 401) {
        return response;
    }
    return response;
});

export default http;
