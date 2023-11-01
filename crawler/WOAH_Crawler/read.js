const fs = require('fs');


// 동기적으로 파일 읽기
try {
    const rawData = fs.readFileSync('./Total.json', 'utf8');
    const jsonData = JSON.parse(rawData);
    console.log(jsonData);
} catch (error) {
    console.error('Error reading or parsing the file:', error);
}