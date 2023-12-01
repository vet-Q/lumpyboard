// apiClient를 인자로 받아 안에서 콜백처럼 사용하는 코드

const path = require("path");
const fs = require("fs");
const {format, utcToZonedTime} = require("date-fns-tz");
const _ = require("lodash");
const Crawler = require('./mainCrawler')
const Api = require('./Woahapi-client')
// 데이터를 직렬화해서 넣기 위한 준비를 하는 코드

async function insertData(data, apiClient) {
    // await sequelize.sync({force: true});  // 기존 데이터를 제거하고 새로운 테이블 생성
    try {
        for (let el of data) {  // 변경된 부분 forEach는 콜백을 실행하지만 await의 비동기 처리를 기다리지 않으므로 사용할 수 없음
            for (let key in el.eventInfo) {
                const eventInfoItem = el.eventInfo[key];
                for (let result of eventInfoItem.resultArray) {
                    const recordToInsert = {
                        //  reportId를 저장하기 위한 코드
                        reportId : key,
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
                    await apiClient.upsertGlobalStat(recordToInsert);
                }
            }
        }
        console.log('Data inserted successfully!');
    } catch (e) {
        console.log(`Upload data Error occured.:${e}`)    }
}


async function crawlAndUpdateDomestic(outputPath, apiClient) {
    let prevData = {};
    const domesticStatPath = path.join(outputPath, 'Total.json');
    try {
        // 기존 크롤링한 값이 있으면 불러오기
        prevData = JSON.parse(fs.readFileSync(domesticStatPath, 'utf-8'));
    } catch(e) {
        console.log('previous domesticStat not found');
    }

    // 한국 시간대 기준으로 현재시점의 날짜를 생성
    const now = new Date();
    const timeZone = 'Asia/Seoul';
    const crawledDate = format(utcToZonedTime(now,timeZone), 'yyyy-MM-dd');

    const newData = {
        crawledDate,
        WoahStat : await Crawler(),
    };

// 변경된 값이 없으면 아무것도 하지 않음
    if (_.isEqual(newData, prevData)) {
        console.log('domesticStat has not been changed');
        await insertData(prevData.WoahStat, apiClient)
        return;
    }

// 크롤링된 최신 값을 파일에 저장
    fs.writeFileSync(domesticStatPath, JSON.stringify(newData));


//  global-stat API를 호출하여 크롤링된 값을 서버에 저장
    await insertData(newData.WoahStat, apiClient)


    console.log('domesticStat updated successfully')
}

module.exports = { crawlAndUpdateDomestic };
//
// const api = new Api()
//
// crawlAndUpdateDomestic (process.cwd(), api )

