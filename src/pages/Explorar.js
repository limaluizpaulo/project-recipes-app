import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

import '../styles/Explorar.css';

function Explorar() {
  return (
    <div>
      <Header />
      <div className="explore-container">
        <Link to="/explorar/comidas">
          <button type="button" data-testid="explore-food" className="explore-btn">
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button type="button" data-testid="explore-drinks" className="explore-btn">
            Explorar Bebidas
          </button>
        </Link>
      </div>
    </div>

  );
}

export default Explorar;
