import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <div>
        <div>
          <Link to="/explorar/comidas">
            <button type="button" data-testid="explore-food">Explorar Comidas</button>
          </Link>
        </div>
        <div>
          <Link to="/explorar/bebidas">
            <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
