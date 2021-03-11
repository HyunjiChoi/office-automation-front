import fileSaver from 'file-saver'

function downloadExcelFile(response, fileName) {
    const excelBlob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    return fileSaver(excelBlob, fileName)
}

export default {
    downloadExcelFile
}
