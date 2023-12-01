const axios = require('axios');
const { subDays } = require('date-fns');
const { format, utcToZonedTime } = require('date-fns-tz');
const _ = require('lodash');
const ApiClient = require('./api-client');


async function getDataSource () {
  const apiClient = new ApiClient();

  //client 실행을 통해 DB상의 전체 데이터를 로드해오는 함수 실행
  const allGlobalStats = await apiClient.getAllGlobalStats();
  const groupedByDate = _.groupBy(allGlobalStats, (item) => item.startDate.split('T')[0]);

  // 날짜별 데이터만 위 데이터에서 추출하는 generateGlobalStats함수 실행 및 반환
  const globalStats = generateGlobalStats(groupedByDate);

  return {
    lastUpdate:Date.now(),
    globalStats,
  }
}

function generateGlobalStats(groupedByDate){

//   오늘과 어제의 날짜 생성
//   데이터가 제공되는 마지막 날짜로 Date 객체 생성
//   const now = new Date(); //현재 시각의 Date 객체 생성

  const now = new Date('2023-10-25 ');
  const timeZone = 'Asia/Seoul';
  const today = format(utcToZonedTime(now, timeZone), 'yyyy-MM-dd');
  const yesterday = format(utcToZonedTime(subDays(now,1), timeZone),'yyyy-MM-dd');

//   오늘 날짜에 대한 데이터가 존재하지 않는 경우 오류 발생시키기
  if ( !groupedByDate[today] ) {
    throw new Error('Data for today is missing');
  }

//   오늘, 어제 데이터를 모두 가진 객체를 생성해서 반환
//   return createGlobalStatWithPrevField (
//
//   console.log(groupedByDate[today])
//   console.log(groupedByDate[yesterday])

  return groupedByDate[today]
}

function createGlobalStatWithPrevField (todaystats, yesterdayStats) {
  // 어제 데이터를 국가 코드 기준으로 찾을 수 있게 변환
  const yesterdayStatByCc = _.keyBy(yesterdayStats, 'country');

//   국가별로 오늘 데이터와 어제 데이터를 한 번에 가질 수 있도록 데이터를 변환
  return todayStats.map((todayStat) => {
    const country = todayStat.country;
    const yesterdayStat = yesterdayStatByCc[country];
    //   어제 데이터가 존재하면 오늘 데이터 필드 외에 xxxxPrev 형태로 어제 데이터 필드 추가
    if (yesterdayStat) {
      return {
        ...todayStat,
        preV: yesterdayStat,
      };
    }
    return todayStat;
  });
}

module.exports = {
  getDataSource,
};