import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Explore.css';

function ExploreFoods() {
  return (
    <div>
      <Link
        to="/explorar/comidas/ingredientes"
        data-testid="explore-by-ingredient"
        className="btn-explore"
      >
        Por Ingredientes
      </Link>
      <Link
        to="/explorar/comidas/area"
        data-testid="explore-by-area"
        className="btn-explore"
      >
        Por Local de Origem
      </Link>
      <Link
        to="/explorar/comidas/suprise"
        data-testid="explore-surprise"
        className="btn-explore"
      >
        Me Surpreenda!
      </Link>
    </div>
  );
}

export default ExploreFoods;
