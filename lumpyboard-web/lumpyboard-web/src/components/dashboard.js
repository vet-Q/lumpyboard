import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { css } from '@emotion/react';
import { DashboardItem } from "./dashboard-item";

export function Dashboard (props) {
  const { globalStats } = props;
//   국가별 데이터의 각 필드별 합계를 계산함.
  const {
    worldConfirmed,
    worldConfirmedprev,
    worldDeath,
    worldDeathprev,
    worldReleased,
    worldReleasedPrev,
  } = globalStats.reduce((acc, x) => {
    return {
      worldConfirmed: (acc.worldConfirmed || 0) + x.confirmed,
      worldConfirmedPrev: (acc.worldConfirmed || 0) + x.confirmedPrev,
      worldDeath: (acc.worldDeath || 0) + x.death,
      worldDeathPrev: (acc.worldDeathPrev || 0) +x .deathPrev,
      worldReleased: (acc.worldReleased || 0) + x.released,
      worldReleasedPrev: (acc.worldReleasedPrev || 0) + x.releasedPrev,
    };
  //   마지막의 {}는 시작값을 빈 객체로 초기화하기 위함.New Object()를 써도 무관함
  },{});

//   치명률, 발생국 수 계산
  const worldFatality = (worldDeath/worldConfirmed)*100;
  const worldCountry = globalStats.filter((x)=> x.confirmed >  0).length;
  const worldCountryPrev = globalStats.filter(
    (x)=> (x.confirmedPrev || 0) === 0,
    ).length;
// 대한민국 데이터를 별도로 추출해서 사용함
  const krData = globalStats.find((x)=> x.cc === 'KR');
  const {
    confirmed,
    confirmedPrev,
    testing,
    testingPrev,
    death,
    deathPrev,
    released,
    releasedPrev,
    negative,
    negativePrev,
  } = krData;

//   대한민국의 치명률, 총 검사자 수 계산
  const fatality = (death/confirmed)*100;
  const tested = confirmed*testing + negative;

}