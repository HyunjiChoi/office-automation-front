import http from '@/util/http'

function login(id, pw) {
    return http.post('/login', { id, pw });
}

export default {
    login
}
