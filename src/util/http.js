import axios from 'axios';
import store from '@/store';
// import { loginApi } from '@/api';

const http = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}/vc-settlement/v1`,
});
http.interceptors.request.use((config) => {
    try {
        config.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            token: store.getters.accessToken || '',
        };
    } catch (e) {
        const error = new axios.Cancel(e.message);
        error.config = config;
        throw error
    }
    return config;
}, err => Promise.reject(err));

http.interceptors.response.use((response) => {
    const {
        data: { code, error },
    } = response;
    if(!error) return response;
    switch (code) {
        case 401:
            throw new Error(JSON.stringify(error));
        default:
    }
    throw new Error(error.message);
}, async (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);
    if (!error.response) return Promise.reject(error);

    const {
        response: { status },
    } = error;

    switch (status) {
        case 401: {
            const refreshTokenCookie = document.cookie.match('(^|;) ?refreshToken=([^;]*)(;|$)');
            const refreshToken = refreshTokenCookie && refreshTokenCookie[2];
            if (!refreshToken) {
                store._vm.$EventBus.$emit('sessionExpired');
                break;
            }

            const retry = () => {
                const {
                    response: {
                        config: { method, data },
                    },
                    request: { responseURL },
                } = error;
                const url = responseURL.substr(process.env.VUE_APP_API_URL.length);

                return http({
                    method,
                    url,
                    data: method.toLowerCase() === 'get' ? undefined : data,
                    params: method.toLowerCase() === 'get' ? data : undefined,
                });
            };
        }
    }
});

export default http;
