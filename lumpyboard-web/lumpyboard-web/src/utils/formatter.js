import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

//Intl 네임스페이스의 NumberFormat을 이용하여 한국에서 사용하는 숫자 포매터 생성
const numberFormatter = new Intl.NumberFormat('Ko-KR');

export function numberWithCommas(x) {
  return numberFormatter.format(x);
}

export function formatDiff(cur,prev) {
  const diff = cur - prev;
  if(diff === undefined || isNaN(diff || diff === 0){
    return '(-)'
  }
  if (diff > 0) {
    return `(+${numberWithCommas(diff)})`
  } else {
    return `(${numberWithCommas(diff)})`
  }
}

//formatDiff()함수와 거의 비슷화지만 증감량이 0일떄 빈 문자열을 반환
export function formatDiffForTable(cur, prevOptional) {
  const prev = prevOptional || 0;
  const diff = cur - prev;

  if (diff === 0 ){
    return "";
  }
  return formatDiff(cur,prev)
}

//yyyy-mm-dd 형식을 간결하게 M,d 형태로 변환하는 함수
export function convertToMonthDay(dateString) {
  return format(parseISO(dateString),"M.d");
}

export function numberWithunitFormatter(value) {
  if (value >= 100000000) {
    return (value/10000000).toFixed(1)+'억'
  } else if(value >= 10000) {
    return (value/10000).toFixed(1)+'만'
  } else if(value >= 1000) {
    return (value/1000).toFixed(1)+'천'
  } else if(value >= 100) {
    return (value/100).toFixed(1)+'백'
  } else {
    return value
  }
};