export default {
    methods: {
        validateDate(date){
            const dayRegExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
            if(!dayRegExp.test(date)) {
                alert('입력날짜를 다시 확인해주세요\nex)2021-01-01');
                return false;
            }
            return true;
        }
    }
}
