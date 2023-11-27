import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

//사용할 컴포넌트들을 임포트 함
import { Container, Button, ButtonGroup } from 'react-bootstrap';

export default function ButtonPage () {
  return (
    <Container>
      <div>
        <Button variant="Primary">Primary</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="success">success</Button>
        <Button variant="danger">danger</Button>
        <Button variant="warning">warning</Button>
      </div>
    <hr/>
      <ButtonGroup size="md">
        <Button variant="primary">오늘</Button>
        <Button variant="outline-primary">어제</Button>
      </ButtonGroup>
    </Container>
  );
};