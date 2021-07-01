import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  return (
    <>
      <Header />
      <Link to="/explorar/bebidas/ingredientes">
        <Button variant="primary" data-testid="explore-by-ingredient">
          Por Ingredientes
        </Button>
      </Link>
      <Button variant="primary" data-testid="explore-surprise">
        Me Surpreenda!
      </Button>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
