import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from "react-bootstrap";
import { Chart } from 'react-google-charts';

export default function GoogleGeoChart() {
  const data = [
    ["Country","Confirmed"],
    ["United States", 394834953403],
    ["India",343535],
    ["France",344545],
    ["Turkey",3434534]
  ];

  const options = {
    colorAxis : {colors:['skyblue', 'purple']},
    region:'KR',
    resolution:'provinces'
  }

  return (
    <Container>
      <Chart chartType="GeoChart"
             width="100%"
             height="100%"
             data = {data}
             options = {options}
      />
    </Container>
  );
}