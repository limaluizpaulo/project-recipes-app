import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <div className="links-page">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
            className="btn btn-success"
          >
            Explorar Comidas
          </button>
        </Link>
        <br />
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
            className="btn btn-success"
          >
            Explorar Bebidas
          </button>
        </Link>
        <Footer />
      </div>
    </div>
  );
}
