import http from '@/util/http'

function createCompanyMall(shippingInfo){
    return http.post('/vcMall', shippingInfo, { headers: { 'Content-Type': 'multipart/form-data' }, responseType: 'arraybuffer' })
}

export default {
    createCompanyMall,
}
