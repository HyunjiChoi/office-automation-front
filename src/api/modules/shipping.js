import http from '@/util/http'

function fetchShippingList() {
    return http.get('/shippings');
}

function deleteShipping(calDt,nmShop) {
    return http.delete(`/shippings/detail?calDt=${calDt}&nmShop=${nmShop}`);
}

function createSipping(shippingInfo){
    return http.post('/shippings', shippingInfo, { headers: { 'Content-Type': 'multipart/form-data' } })
}

function fetchShippingDetail(calDt,nmShop) {
    return http.get(`/shippings/detail?calDt=${calDt}&nmShop=${nmShop}`);
}


export default {
    fetchShippingList,
    deleteShipping,
    createSipping,
    fetchShippingDetail,
}
