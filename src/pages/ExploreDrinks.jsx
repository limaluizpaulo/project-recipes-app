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
        <Container>

          <Button
            data-testid="explore-by-ingredient"
            onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          >
            Por Ingredientes
          </Button>
        </Container>

        <Container>

          <Button
            data-testid="explore-surprise"
            onClick=""/* { () => history.push() } */
          >
            Me Surpreenda!

          </Button>
        </Container>

      </Container>

      <Footer />
    </Container>
  );
}

export default ExploreDrinks;
