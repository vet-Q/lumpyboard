import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { Echart } from '../../components/echart';
import { css } from '@emotion/react';

export default function PieChart () {
//   파이 차트를 그리는데 있어 사용할 데이터
  const pieChartData = [
    {name:"소", value: 7000},
    {name:"물소", value: 500},
  ];

//   데이터의 총합을 계산
  const total = pieChartData.reduce((acc,x)=> acc+x.value,0);

//   차트 데이터 및 레이블 정보등 제공
  const series = [
    {
      label:{
        position: 'outer',
        formatter:(obj)=>{
          const percent = ((obj.value/total)*100).toFixed(1);
          return `${obj.name} ${obj.value}두\n(${percent}%)`;
        }
      },
      type: 'pie',
      radius:'50%',
      data: pieChartData
    }
  ];

//   차트에 있어 필요한 옵션을 정리하는 객체 선언
  const chartOption = {
    animation: true,
    title: {
      text:"대한민국 축종별 확진 현황",
      left:"center",
      top: 30,
    },
    legend:{
      data: pieChartData.map((x)=> x.name),
      bottom:20,
    },
    series,
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
  );
}