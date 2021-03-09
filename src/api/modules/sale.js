import http from '@/util/http'

function fetchSaleList() {
    return http.get('/sales');
}

function deleteSale(calDt) {
    return http.delete('/sales',{calDt});
}

function fetchSaleDetail(calDt) {
    return http.get(`/sales/detail?calDt=${calDt}`);
}


export default {
    fetchSaleList,
    deleteSale,
    fetchSaleDetail
}
