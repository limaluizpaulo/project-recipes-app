import React from 'react';
import { Link } from 'react-router-dom';

export default function ExploreBtn() {
  return (
    <div>
      <Link data-testid="explore-food" to="/explorar/comidas">Explorar Comidas</Link>
      <Link data-testid="explore-drinks" to="/explorar/bebidas">Explorar Bebidas</Link>
    </div>
  );
}
