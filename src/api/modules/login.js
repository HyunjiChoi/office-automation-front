import http from '@/util/http'

function login(id,pwd) {
    return http.post('/login', { id,pwd });
}

export default {
    login
}
