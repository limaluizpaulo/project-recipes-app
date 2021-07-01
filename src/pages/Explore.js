import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  return (
    <div>
      <Header />
      <Link to="/explorar/comidas">
        <Button variant="primary" data-testid="explore-food">
          Explorar Comidas
        </Button>
      </Link>
      <Link to="/explorar/bebidas/">
        <Button variant="primary" data-testid="explore-drinks">
          Explorar Bebidas
        </Button>
      </Link>
      <Footer />
    </div>
  );
}
