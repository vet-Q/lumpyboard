const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

function readFile (filePath) {
    // 동기적으로 파일 읽기
    try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(rawData);

    } catch (error) {
        console.error('Error reading or parsing the file:', error);
    }
}

//index.js 로 빼서 재정의 할 부분
const sequelize = new Sequelize('lumpyboard', 'user', '1234qwer@', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: console.log  // 로깅 활성화
});




const yourData= readFile('./Total.json');

insertData(yourData).then(() => {
    sequelize.close();
}).catch(error => {
    console.error('Error inserting data:', error);
});
