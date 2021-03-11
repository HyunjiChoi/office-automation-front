export default {
    data(){
        return {
            fileName: ''
        };
    },
    methods: {
        getFile() {
            const [File] = [...this.$refs.files.files];
            const acceptTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
            if (!File?.name) {
                alert('파일을 선택해 주세요.')
                return false;
            }
            if (acceptTypes.indexOf(File.type) === -1) {
                alert('xlsx파일만 업로드 가능합니다.')
                return false;
            }
            return File
        },
        getFileName(){
            const [File] = [...this.$refs.files.files];
            this.fileName = File?.name
        },
        selectFile(){
            this.$refs.files.click()
        },
    },
}
