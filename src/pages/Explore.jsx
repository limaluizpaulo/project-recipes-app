import React from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Explore.css';

function Explore() {
  const history = useHistory();

  return (
    <>
      <section className="explore-section">
        <Header profile name="Explorar" />
        <Container>
          <ButtonGroup vertical className="buttons-explore">
            <Button
              data-testid="explore-food"
              variant="danger"
              size="lg"
              onClick={ () => history.push('/explorar/comidas') }
            >
              Explorar Comidas
            </Button>
            <Button
              data-testid="explore-drinks"
              variant="danger"
              size="lg"
              onClick={ () => history.push('/explorar/bebidas') }
            >
              Explorar Bebidas
            </Button>
          </ButtonGroup>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Explore;
