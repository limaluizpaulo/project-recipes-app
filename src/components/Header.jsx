import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SearchIcon from './SearchIcon';
import ProfileIcon from './ProfileIcon';

export default function Header() {
  

  return (
    <Container>
      <Row>
        <ProfileIcon />
        <Col>
          <h1 data-testid="page-title">
            Comidas
          </h1>
        </Col>
        <SearchIcon />
      </Row>
    </Container>
  );
}
