const ExcelJS = require('exceljs');

async function saveToExcel(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // 헤더 추가 (데이터의 필드에 따라 변경해야 할 수 있습니다)
    worksheet.columns = [
        { header: 'Id', key: 'Id' },
        { header: 'location', key: 'location' },
        { header: 'longitude',key: 'longitude'},
        { header: 'latitude', key: 'latitude'}
        // ... 다른 필드들 ...
    ];

    // 데이터 추가 (데이터 구조에 따라 변경해야 할 수 있습니다)
    data.forEach(item => {
        worksheet.addRow({
            Id: item.outbreakId,
            location: item.location,
            longitude: item.longitude,
            latitude: item.latitude,
            // ... 다른 필드들 ...
        });
    });

    // Excel 파일로 저장
    await workbook.xlsx.writeFile('./output.xlsx');
    console.log('Excel file saved as output.xlsx');
}

module.exports = {
    saveToExcel,
}