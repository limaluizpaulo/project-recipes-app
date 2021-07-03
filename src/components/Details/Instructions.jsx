import React from 'react';
import { Container } from 'react-bootstrap';

export default function Title({ instructions }) {
  return (
    <Container>
      <h4>Instruções</h4>
      <p align="justify" data-testid="instructions">{ instructions }</p>
      <br/>
    </Container>
  );
}
