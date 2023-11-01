
const axios = require('axios');
const { getValuesAsObject, getValuesAsArray, extractKeysFromNestedObject } = require('./utils');

class SubCrawler {
    constructor(url) {
        this.url = url
        this.Client = axios.create({
            //실제 크롬 웹브라우저에서 보내는 값과 동일하게 넣기
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
            }
        });
    }

    async crawlstats() {
        // axios를 이용해 원하는 변수에 긁어온 데이터를 담는 함수
        let data = await this.Client.get(this.url);

        // wrapping을 통해 객체의 값이 없으면 null을 배정하는 함수 선언
        // 객체에 outbreaks라는 항목이 있으면, 해당 값을 outbreaks에 할당하고, 해당값이 없으면 no data를 outbreaks에 할당.

        let outbreaks = data.data.hasOwnProperty('outbreaks') ? data.data.outbreaks : 'no data'
        let event = data.data.hasOwnProperty('event')? data.data.event : 'no event'


        // map을 이용하여 배열을 순회하며 필요한 데이터만 추출하여 저장.


        const FieldList = [
            'outbreakId',
            'adminDivision',
            'location',
        ]

        // outbreakId만 추출하여 reportNumber변수에 할당
        const reportNumber = outbreaks.map(obj => getValuesAsArray(obj,'outbreakId'));
        const eventField = {
            "country":event.country.name,
            "disease":event.disease.name,
            "causalAgent":event.causalAgent.name,
        }

        return {eventField, reportNumber}
    }
}

module.exports = SubCrawler;