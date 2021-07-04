import React from 'react';
import { Link } from 'react-router-dom';

function ExploreFoods() {
  return (
    <div>
      <Link
        to="/explorar/comidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <Link
        to="/explorar/comidas/area"
        data-testid="explore-by-area"
      >
        Por Local de Origem
      </Link>
      <Link
        to="/explorar/comidas/suprise"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Link>
    </div>
  );
}

export default ExploreFoods;
