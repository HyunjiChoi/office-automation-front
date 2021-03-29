import axios from 'axios';
import store from '@/store';
import { loginApi } from '@/api';

const http = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}/vc-settlement/v1`,
});
http.interceptors.request.use((config) => {
    try {
        config.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: store.getters.accessToken || '',
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
        case 101:
            alert('아이디 또는 비밀번호를 확인해주세요.')
            break;
        case 110:
            store._vm.$EventBus.$emit('sessionExpired');
            break;
        case 401:
            throw new Error(JSON.stringify(error));
        case 406:
            alert('같은 날짜에 등록된 내용이 있습니다.\n삭제 후 진행해주세요.')
            break;
        default:
    }
    throw new Error(error.message);
    },
    async (error) => {
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
                const url = responseURL.substr(`${process.env.VUE_APP_API_URL}/vc-settlement/v1`.length);

                return http({
                    method,
                    url,
                    data: method.toLowerCase() === 'get' ? undefined : data,
                    params: method.toLowerCase() === 'get' ? data : undefined,
                });
            };

            let date = new Date();
            date.setDate(date.getDate() - 1);
            document.cookie = `refreshToken=0;expires=${date.toUTCString()};path=/;`;

            const {
                data: {
                    success: { accessToken, refreshToken: newRefreshToken },
                },
            } = await loginApi.refreshSession(refreshToken);

            date = new Date();
            date.setTime(date.getTime() + 60 * 60 * 60 * 24 * 1000);
            document.cookie = `refreshToken=${newRefreshToken};expires=${date.toUTCString()};path=/;`;
            localStorage.setItem('accessToken', accessToken);
            store.commit('setAccessToken', accessToken);

            return retry();
        }
        default:
            break;
    }
    return Promise.reject(error);
});

export default http;
