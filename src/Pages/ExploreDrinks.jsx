import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

function ExploreDrinks() {
  return (
    <div>
      <Header />
      <Link
        to="/explorar/bebidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <Link
        to="/explorar/bebidas/suprise"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Link>
      Explore Bebidas
    </div>
  );
}

export default ExploreDrinks;
