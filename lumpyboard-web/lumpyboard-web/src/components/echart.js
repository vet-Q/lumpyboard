import React, { useEffect, useRef } from "react";
import * as echarts from 'echarts';

export function Echart(props) {
  const { wrapperCss, option } = props;
  const chartRef = useRef(null);

  useEffect(() => {
    // echart를 초기화에서 정의한 DOM 엘리먼트에 차트를 그리도록 설정함.

    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(option);

    // 함수를 리턴 => 의존하는 상태 변수가 바뀌거나 현재 컴포넌트가 DOM에서 제거될 때 사용중인
    // 리소스를 정리하기 위한 클린업 함수를 정의하여 반환함.
    return () => {
      chartInstance.dispose();
    };
  }, [option]);

  return <div css={wrapperCss} ref={chartRef} />;
}