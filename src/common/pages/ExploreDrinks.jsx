import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import { fetchAPI, SUPRISE_ME_DEINKS } from '../../services/index';
import { addRecDetail } from '../../context/store';

export default function ExploreMeals() {
  function handleClic() {
    fetchAPI(SUPRISE_ME_DEINKS).then((res) => addRecDetail(res.drinks));
  }
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
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => handleClic() }
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
}
