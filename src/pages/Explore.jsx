import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components';

function Explore() {
  return (
    <section>
      <Link to="/explorar/comidas">
        <p data-testid="explore-food">Explorar Comidas</p>
      </Link>

      <Link to="/explorar/bebidas">
        <p data-testid="explore-drinks">Explorar Bebidas</p>
      </Link>
      <Footer />
    </section>
  );
}

export default Explore;
