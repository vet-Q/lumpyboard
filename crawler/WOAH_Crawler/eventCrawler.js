const axios = require('axios');
// 가공과 관련된 함수를 모두 util.js에 선언하고, 이를 destructuring으로 할당 받아 사용.
const { getValuesAsObject, getValuesAsArray, extractKeysFromNestedObject } = require('./utils');

// Array.from 으로 빈 배열 100개를 만들고, 여기에 map 함수를 파라미터로 받아 1+씩 넣는 코드
// 시연을 위해 돌려봄(관련 코드 아님)
const numbers = Array.from({ length: 100 }, (_, index) => index + 1);


async function eventCrawl(reportNumber, num) {

    // 백틱으로 받을 문자열만 정의하고 나머지는 변하지 않으므로 uri 값으로 선언
    let uri = `https://wahis.woah.org/api/v1/pi/review/report/${reportNumber}/outbreak/${num}/all-information?language=en`

    // header 값 넣어줘서 axios 생성
    const Client = axios.create({
        //실제 크롬 웹브라우저에서 보내는 값과 동일하게 넣기
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        }
    });

    // axios를 이용해 원하는 변수에 긁어온 데이터를 담는 함수
    let data = await Client.get(uri);

    // outbreak값이 없는 경우가 있을 수 있으므로 Nullish coalishing? 으로 선언하여 없으면 None을 반환하도록 선언
    let outbreak = data.data.outbreak? data.data.outbreak : "no data"
    let Quantity = data.data.speciesQuantities ? data.data.speciesQuantities : "None"
    let measureObj = data.data.controlMeasures? data.data.controlMeasures : "no_measure"
    let adminDivision = data.data.adminDivisions? data.data.adminDivisions : "No Division"

    // map을 이용하여 배열을 순회하며 필요한 데이터만 추출하여 저장.
    const FieldList = [
        'speciesName',
        'isWild',
        'susceptible',
        'cases',
        'deaths',
        'killed',
        'slaughtered',
        'vaccinated'
    ]

    const GeneralList = [
        'startDate',
        'endDate',
        'latitude',
        'longitude',
        'location',
        'createdByReportId'
    ]

    // 필요한 값만 객체에서 추출해 새 객체를 생성하고, 이를 배열에 담아 반환
    // 1) filter로 새 발생이 없는 경우 제거하고,
    // 2) 새로운 발생에 대해 필요한 항목만 추출해서 새 객체로 생성.

    // adminDivisions 배열의 각 항목에서 name을 가져와 배열로 만들고 (map 함수 사용), 이를 ,로 연결하여 문자열로 변환합니다 (join 함수 사용).
    const address = adminDivision.map(item => item.name).join(', ');

    const dates = getValuesAsObject(outbreak, GeneralList);
    // dates에 address를 추가하는 구문
    dates['address'] = address

    const resultArray = Quantity
        .filter(obj => obj.newQuantities !== null)
        .map(obj => getValuesAsObject(obj.newQuantities, FieldList));

    // variable measure needs the name of measure. mesurement name is in the nested 'mesure' object,
    // We show input obj.measure, not just obj.
    const measure = measureObj.filter(obj => obj !== null).map(obj=> getValuesAsArray(obj.measure,'name'))

    return {dates, resultArray, measure}
}

module.exports = eventCrawl

eventCrawl(163510, 126689 )