import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarComidasOuBebidas() {
  const { pathname } = useLocation();
  return (
    <section>
      <Header />
      <Link to={ `${pathname}/ingredientes` }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      { pathname !== '/explorar/bebidas' ? (
        <Link to={ `${pathname}/area` }>
          <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
        </Link>
      ) : '' }
      <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
      <Footer />
    </section>
  );
}
