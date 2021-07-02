import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Explore.css';

function Explore() {
  const history = useHistory();

  return (
    <Container>
      <Header profile name="Explorar" />
      <div className="buttons-explore d-grid gap-2">
        <Button
          data-testid="explore-food"
          variant="outline-secondary"
          size="lg"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </Button>
        <Button
          data-testid="explore-drinks"
          variant="outline-secondary"
          size="lg"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </Button>
      </div>
      <Footer />
    </Container>
  );
}

export default Explore;
