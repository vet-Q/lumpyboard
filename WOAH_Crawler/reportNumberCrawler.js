const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { format, utcToZonedTime } = require('date-fns-tz');
const { getValuesAsObject, getValuesAsArray, extractKeysFromNestedObject } = require('./utils');



class ReportNumberCrawler {
    constructor(url) {
        this.Client = axios.create({
            baseURL: 'https://wahis.woah.org',
            headers : {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en',
                'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept,Client-Security-Token, Accept-Encoding, accept-language, type, authorizationToken, methodArn',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
                'Access-Control-Allow-Origin': '*',
                'Clientid': 'OIEwebsite',
                'Content-Type': 'application/json',
                'Env': 'PRD',
                'Origin': 'https://wahis.woah.org',
                'Pragma': 'no-cache',
                'Referer': 'https://wahis.woah.org/',
                'Sec-Ch-Ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': 'Windows',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Token': '#PIPRD202006#',
                'Type': 'REQUEST',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'sameorigin'
            },
            timeout: 10000, // 선택적으로 타임아웃을 설정할 수 있습니다.
        });
        // 전송할 데이터의 payload를 긁어와서 파일로 만들어야 함.
        // page size는 100page로 설정하고 한번에 데이터 가져오도록 설정
        this.payload = {"eventIds":[],"reportIds":[],"countries":[],"firstDiseases":[769],"secondDiseases":[],"typeStatuses":[],"reasons":[],"eventStatuses":[],"reportTypes":[],"reportStatuses":[],"eventStartDate":null,"submissionDate":null,"animalTypes":[],"sortColumn":"submissionDate","sortOrder":"desc","pageSize":100,"pageNumber":0}
    }

    async crawlNumber() {
        const data = await this.Client.post('/api/v1/pi/event/filtered-list?language=en', this.payload)
        let event = data.data.hasOwnProperty('list')? data.data.list : 'no event'
        // map을 이용하여 배열을 순회하며 필요한 데이터만 추출하여 저장.
        const FieldList = [
            'reportId',
            'eventId'
        ]

        const resultArray = event
            .map(obj => getValuesAsObject(obj, FieldList));

        const ReportnumberPath = path.join(process.cwd(), 'ReportNumber.json');
        try {
            //     기존 크롤링한 값이 있으면 불러오기
            prevData = JSON.parse(fs.readFileSync(ReportnumberPath, 'utf-8'));
        } catch(e) {
            console.log('previous domesticStat not found');
        }


//     한국 시간대 기준으로 현재시점의 날짜를 생성
        const now = new Date();
        const timeZone = 'Asia/Seoul';
        const crawledDate = format(utcToZonedTime(now,timeZone), 'yyyy-MM-dd');

        const newData = {
            crawledDate,
            NumberStat : resultArray,
        };


//     크롤링된 최신 값을 파일에 저장
        fs.writeFileSync(ReportnumberPath, JSON.stringify(newData));

        // console.log(resultArray)

        return newData
    }
}


module.exports = ReportNumberCrawler;


