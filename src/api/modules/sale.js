import http from '@/util/http'

function fetchSaleList() {
    return http.get('/sales');
}

function deleteSale(calDt) {
    return http.delete(`/sales/detail?calDt=${calDt}`);
}

function registerSale(calDt, frontVideofile){
    return http.post('/sales', {calDt, frontVideofile})
}

function fetchSaleDetail(calDt) {
    return http.get(`/sales/detail?calDt=${calDt}`);
}


export default {
    fetchSaleList,
    deleteSale,
    registerSale,
    fetchSaleDetail
}
