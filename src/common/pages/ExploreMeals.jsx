import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function ExploreMeals() {
  return (
    <div>
      <Header pageName="Explorar comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes

        </button>
      </Link>
      <br />
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
      </Link>
      <br />
      <Link to="/">
        <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
      <Footer />
    </div>
  );
}
