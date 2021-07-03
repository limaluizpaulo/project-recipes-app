import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';

export default function ExploreMeals() {
  return (
    <div>
      <Header pageName="Explorar Bebidas " />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes

        </button>
      </Link>
      <br />
      <Link to="/">
        <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
    </div>
  );
}
