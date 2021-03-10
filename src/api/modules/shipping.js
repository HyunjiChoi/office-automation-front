import http from '@/util/http'

function fetchShippingList() {
    return http.get('/shippings');
}

function deleteShipping(calDt,nmShop) {
    return http.delete(`/shippings/detail?calDt=${calDt}&nmShop=${nmShop}`);
}

function registerSale(calDt, frontVideofile){
    return http.post('/sales', {calDt, frontVideofile})
}

function fetchShippingDetail(calDt,nmShop) {
    return http.get(`/shippings/detail?calDt=${calDt}&nmShop=${nmShop}`);
}


export default {
    fetchShippingList,
    deleteShipping,
    registerSale,
    fetchShippingDetail
}
