import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const history = useHistory();

  return (
    <Container>
      <Header profile name="Explorar Bebidas" />

      <Container>

        <Button
          data-testid="explore-by-ingredient"
          variant="outline-secondary"
          size="lg"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes

        </Button>

        <Button
          data-testid="explore-by-area"
          variant="outline-secondary"
          size="lg"
          onClick={ () => history.push('/explorar/bebidas/area') }
        >
          Por Local de Origem

        </Button>

        <Button
          data-testid="explore-surprise"
          variant="outline-secondary"
          size="lg"
          onClick=""/* { () => history.push() } */
        >
          Me Surpreenda!

        </Button>

      </Container>

      <Footer />
    </Container>
  );
}

export default ExploreDrinks;
