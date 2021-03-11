export default {
    methods: {
        getFile() {
            const [File] = [...this.$refs.files.files];
            const acceptTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
            if (!File?.name) return false;
            if (acceptTypes.indexOf(File.type) === -1) {
                alert('xlsx파일만 업로드 가능합니다.')
                return false;
            }
            return File
        }
    }
}
