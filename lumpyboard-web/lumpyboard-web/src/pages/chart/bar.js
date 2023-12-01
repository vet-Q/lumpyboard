import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { Echart } from "../../components/echart";
import { css } from '@emotion/react';

export default function BarChart(){
//   레이블 표시 여부 및 위치 설정
  const labelOptions = {
    show: true,
    position: 'top',
  };

  const series = [
    {
      name: '확진',
      type:'bar',
      color:'#e2431e',
      label: labelOptions,
      data: [743,556,485,454,602],
    },
    {
      name: '격리해제',
      type:'bar',
      color:'#6f9654',
      label: labelOptions,
      data: [477,599,42,432,762],
    },
  ];

//   차트를 그리는데 필요한 모든 옵션을 하나의 객체에 모아서 정의
  const chartOption = {
    title: {
      text: '대한민국 럼피스킨병 추이',
      left: 'center',
    },
    legend: {
      data: series.map((x)=> x.name),
      bottom:20,
    },
    xAxis:{
      data: ['6.5','6.6','6.7','6.8','6.9'],
    },
    yAxis:{},
    tooltip:{
      trigger:'axis',
    },
    series,
    animation:false,
  };

  return (
    <Container>
      <Echart
        wrapperCss={css`
        width:100%;
        height:400px;
        `}
        option={chartOption}
      />
    </Container>
  )
}