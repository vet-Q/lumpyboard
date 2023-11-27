import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import { css } from '@emotion/react';


const borderedGrid = css`
  text-align: center;
  div {
    background-color:lightgrey;
    border: 1px solid grey;
    padding: 10px;
    margin-bottom: 20px;
  }
  `

export default function ContainerPage() {
  return (
    <div>
      <Container className='pt-3' css={borderedGrid}>
      <h2>전 세계</h2>
        <Row>
          <Col xs={4} md >확진</Col>
          <Col xs={4} md >폐사수</Col>
          <Col xs={4} md >살처분수</Col>
          <Col xs={6} md >사육두수</Col>
          <Col xs={6} md >폐기두수</Col>
        </Row>
        <h2>대한민국</h2>
        <Row>
          <Col xs={4} md >확진</Col>
          <Col xs={4} md >폐사수</Col>
          <Col xs={4} md >살처분수</Col>
          <Col xs={6} md >사육두수</Col>
          <Col xs={6} md >폐기두수</Col>
        </Row>
      </Container>
    </div>
  );
}