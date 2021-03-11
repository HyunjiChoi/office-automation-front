import http from '@/util/http'

function login(id, pw) {
    return http.post('/login', { id, pw });
}

function refreshSession(refreshToken) {
    return http.post('/refresh-token', {refreshToken})
}

export default {
    login,
    refreshSession
}
