import React from 'react';
import { Container } from 'react-bootstrap';

export default function Thumb({ title, thumb }) {
  return (
    <Container>
      <img data-testid="recipe-photo" width="100%" alt={ title } src={ `${thumb}` } />
    </Container>
  );
}
