import React from 'react';
import { Link } from 'react-router-dom';

import './style/Explore.css';

function Explore() {
  return (
    <main>
      <button type="button">
        <Link
          to="/explorar/comidas"
          data-testid="explore-food"
        >
          Explorar Comidas
        </Link>
      </button>
      <button type="button">
        <Link
          to="/explorar/bebidas"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </Link>
      </button>
    </main>
  );
}

export default Explore;
