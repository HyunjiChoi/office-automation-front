import http from '@/util/http'

function fetchConfirmList() {
    return http.get('/confirms');
}

function deleteConfirm(calDt,nmShop) {
    return http.delete(`/confirms/detail?calDt=${calDt}&nmShop=${nmShop}`);
}

function fetchConfirmAdjustmentList() {
    return http.get('/confirms/adjustment');
}

function fetchConfirmDetail(calDt,nmShop) {
    return http.get(`/confirms/detail?calDt=${calDt}&nmShop=${nmShop}`);
}


export default {
    fetchConfirmList,
    deleteConfirm,
    fetchConfirmAdjustmentList,
    fetchConfirmDetail
}
