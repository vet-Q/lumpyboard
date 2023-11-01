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

// WOAH_stat.js로 빼서 재정의 할 부분.
// Event 라는 이름으로 시퀄라이즈 모델을 정의하고,  테이블 이름도 정의
const Event = sequelize.define('Event', {
    country: DataTypes.STRING,
    disease: DataTypes.STRING,
    causalAgent: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    speciesName: DataTypes.STRING,
    isWild: DataTypes.BOOLEAN,
    susceptible: DataTypes.INTEGER,
    cases: DataTypes.INTEGER,
    deaths: DataTypes.INTEGER,
    killed: DataTypes.INTEGER,
    slaughtered: DataTypes.INTEGER,
    vaccinated: DataTypes.INTEGER
});

async function insertData(data) {
        // await sequelize.sync({force: true});  // 기존 데이터를 제거하고 새로운 테이블 생성
    try {
        for (let el of data) {  // 변경된 부분 forEach는 콜백을 실행하지만 await의 비동기 처리를 기다리지 않으므로 사용할 수 없음
            for (let key in el.eventInfo) {
                const eventInfoItem = el.eventInfo[key];
                for (let result of eventInfoItem.resultArray) {
                    const recordToInsert = {
                        country: el.eventField.country,
                        disease: el.eventField.disease,
                        causalAgent: el.eventField.causalAgent,
                        startDate: eventInfoItem.dates.startDate,
                        endDate: eventInfoItem.dates.endDate,
                        latitude: eventInfoItem.dates.latitude,
                        longitude: eventInfoItem.dates.longitude,
                        location: eventInfoItem.dates.location,
                        address: eventInfoItem.dates.address,
                        ...result
                    }
                    console.log('Inserting record:', recordToInsert);
                    await Event.create(recordToInsert);
                }
            }
        }
        console.log('Data inserted successfully!');
    } catch (e) {
        console.log('Upload data Error occured.')
    }
}



const yourData= readFile('./Total.json');

insertData(yourData).then(() => {
    sequelize.close();
}).catch(error => {
    console.error('Error inserting data:', error);
});
