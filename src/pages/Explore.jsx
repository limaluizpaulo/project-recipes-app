import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  return (
    <Container>
      <Header profile name="Explorar" />

      <Container>
        <Button
          data-testid="explore-food"
          variant="outline-secondary"
          size="lg"
        >
          Explorar Comidas

        </Button>
      </Container>

      <Container>
        <Button
          data-testid="explore-drinks"
          variant="outline-secondary"
          size="lg"
        >
          Explorar Bebidas

        </Button>
      </Container>

      <Footer />
    </Container>
  );
}

export default Explore;
