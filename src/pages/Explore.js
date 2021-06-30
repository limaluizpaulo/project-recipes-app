import React from 'react';
import { Link } from 'react-router-dom';

function Explore() {
  return (
    <div>
      <Link
        to="/explorar/comidas"
        data-testid="explore-food"
      >
        Explorar Comidas
      </Link>
      <br />
      <Link
        to="/explorar/bebidas"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </Link>
    </div>
  );
}

export default Explore;
