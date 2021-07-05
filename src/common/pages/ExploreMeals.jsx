import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { fetchAPI, SUPRISE_ME_MEALS } from '../../services/index';

export default function ExploreMeals() {
  function handleClic() {
    fetchAPI(SUPRISE_ME_MEALS).then((res) => console.log(res));
  }
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
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => handleClic() }
        >
          Me Surpreenda!

        </button>
      </Link>
      <Footer />
    </div>
  );
}
