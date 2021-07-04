import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import '../styles/Explore.css';

function ExploreDrinks() {
  return (
    <div>
      <Header />
      <Link
        to="/explorar/bebidas/ingredientes"
        data-testid="explore-by-ingredient"
        className="btn-explore"
      >
        Por Ingredientes
      </Link>
      <Link
        to="/explorar/bebidas/suprise"
        data-testid="explore-surprise"
        className="btn-explore"
      >
        Me Surpreenda!
      </Link>
      Explore Bebidas
    </div>
  );
}

export default ExploreDrinks;
