
const _ = require('lodash'); //다양한 유틸리티를 위한 함수
const axios = require('axios'); //HTTP 클라이언트 모듈
const cheerio = require('cheerio');

// client에 axios를 Client라는 변수로 선언을 해서, 이 변수를 불러와 함수를 사용하는 형태로 정의.
// 클래스 문법에 익숙해져야 함. 클래스 문법 짱.
class DomesticCrawler {
    constructor() {
    this.Client = axios.create({
        //실제 크롬 웹브라우저에서 보내는 값과 동일하게 넣기
        headers: {
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        }
    });
    }

    async crawlStat (){
        const url = "https://yjiq150.github.io/coronaboard-crawling-sample/clone/ncov";
        const resp = await this.Client.get(url);
        const $ = cheerio.load(resp.data)

        return {
        //     확진자,사망자, 격리해제, 검사중, 결과음성, 총 검사자 수
            basicStats : this._extractBasicStats($),
            byAge: this._extractByAge($),
            bySex: this._extractBySex($) //성별에 따른 확진자, 사망자 수

        };
    }

    // 텍스트로된 숫자를 실제 수치로 변환하기
    _extractBasicStats($){
        let result = null;
        const titles = $('h5.s_title_in3');
        titles.each((i,el) => {
        //     h5태그 안에 텍스트와 span 태그(업데이트 날짜)가 섞여 있는 경우가 존재
        //     여기서 태그를 제외하고 순수 텍스트만 분리함
            const titleTextEl = $(el)
                .contents()
                .toArray()
                .filter((x) => x.type === 'text' );
            if ($(titleTextEl).text().trim() === '누적 검사현황') {
                console.log('찾았습니다.');
                console.log(titleTextEl)
                const tableEL = $(el).next();
                if (!tableEL) {
                    throw new Error('table not found')
                }
            //     테이블 내의 셀을 모두 찾아서 가져옴
                const cellEls = tableEL.find('tbody tr td');

            //     찾아진 셀에 있는 텍스트를 읽어서 숫자로 변환함
                const values = cellEls.toArray().map((node)=> this._normalize($(node).text()));

                result = {
                    confirmed: values[3],
                    released: values[1],
                    death: values[2],
                    tested: values[5],
                    testing: values[6],
                    negative: values[4],
                }
            }
        });

        if (result==null) {
            throw new Error('Data not found');
        }

        console.log(result)
        return result;
    }
    _extractByAge($){
    //     '구분' 컬럼의 텍스트를 필드 이름으로 매칭
        const mapping = {
            '80이상': '80',
            '70-79' : '70',
            '60-69' : '60',
            '50-59' : '50',
            '40-49' : '40',
            '30-39' : '30',
            '20-29' : '20',
            '10-19' : '10',
            '0-9' : '0',
        };
        console.log(this._extractDataWithMapping(mapping, $))
        return this._extractDataWithMapping(mapping, $)
    }

    _extractBySex($) {
        const mapping = {
            남성:'male',
            여성:'female'
        };
        console.log(this._extractDataWithMapping(mapping, $))
        return this._extractDataWithMapping(mapping, $)
    }
    _extractDataWithMapping(mapping, $) {
        const result = {};
        $('.data_table table').each((i,el)=> {
            $(el)
                .find('tbody tr')
                .each((j,row) => {
                    const cols = $(row).children(); //서브 요소를 모두 가져옴
                    _.forEach(mapping, (fieldName,firstColumnsText) => {
                        if ($(cols.get(0)).text() === firstColumnsText) {
                            result[fieldName] = {
                                confirmed: this._normalize($(cols.get(1)).text()),
                                death : this._normalize($(cols.get(2)).text())
                            };
                        }
                    });
                });
        });
        if ( _.isEmpty(result)) {
            throw new Error('data not found');
        }
        return result
    }


    // 정규표현식을 이용하여 텍스트로부터 숫자만 추출하기 위한 함수.
    _normalize(numberText) {
//         아래 형태로 돌아올 떄 괄호 없는 앞쪽 숫자만 추출
//     ex) 8.757(45.14)
    const matches = /[0-9,]+/.exec(numberText);
    const absValue = matches[0];
    return parseInt(absValue.replace(/[\s,]*/g,''));
    }
}

module.exports = {
    DomesticCrawler,
}

let domesticCrawler = new DomesticCrawler();
console.log(domesticCrawler.crawlStat())