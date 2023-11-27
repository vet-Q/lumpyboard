import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Card, Accordion, Button} from "react-bootstrap";

export default function CardPage(){
  return (
    <div>
    <Container className="pt-3">
      <Accordion defaultActiveKey="2">
      <Card>
        <Card.Header>
            <Accordion.Toggle
              className = 'p-0'
              as = {Button}
              variant = "link"
              eventKey = "2"
            >
            카드의 헤더
            </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
           <Card.Body>
             <Card.Title>카드의 타이틀</Card.Title>
             < Card.Subtitle className="text-muted mb-3">
               카드의 서브타이틀
             </Card.Subtitle>
             <Card.Text>카드의 텍스트</Card.Text>
            </Card.Body>
          </Accordion.Collapse>
      </Card>
      </Accordion>
    </Container>
  <Container className="pt-2">
    <Accordion defaultActiveKey="4">
      <Card>
        <Card.Header>
          <Accordion.Toggle
            className = 'p-0'
            as = {Button}
            variant = "link"
            eventKey = "4"
          >
            카드의 헤더
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="4">
          <Card.Body>
            <Card.Title>카드의 타이틀</Card.Title>
            < Card.Subtitle className="text-muted mb-3">
              카드의 서브타이틀
            </Card.Subtitle>
            <Card.Text>카드의 텍스트</Card.Text>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  </Container>
  </div>
  );
}