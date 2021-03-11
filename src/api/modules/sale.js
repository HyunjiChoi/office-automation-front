import http from '@/util/http'

function fetchSaleList() {
    return http.get('/sales');
}

function deleteSale(calDt) {
    return http.delete(`/sales/detail?calDt=${calDt}`);
}

function createSale(saleInfo ){
    return http.post('/sales',  saleInfo, { headers: { 'Content-Type': 'multipart/form-data' } })
}

function fetchSaleDetail(calDt) {
    return http.get(`/sales/detail?calDt=${calDt}`);
}

function fetchSalesXlsx(calDt){
    return http.get(`/sales/detail/xlsx?calDt=${calDt}`, {responseType: 'arraybuffer'})
}


export default {
    fetchSaleList,
    deleteSale,
    createSale,
    fetchSaleDetail,
    fetchSalesXlsx
}
