import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { fetchRandomMeal } from '../Service/foodApi';
import { fetchRandomDrink } from '../Service/drinkApi';

import Footer from '../components/Footer';
import Header from '../components/Header';
import AreaExplorer from '../components/AreaExplorer';
import SearchIngredients from './SearchIngredients';

export default function Explorar() {
  const { pathname } = useLocation();

  const [idMeal, setIdMeal] = useState('');
  const [idDrink, setIdDrink] = useState('');

  const getApi = () => {
    fetchRandomMeal().then((response) => setIdMeal(response[0].idMeal));
    fetchRandomDrink().then((response) => setIdDrink(response[0].idDrink));
  };
  useEffect(getApi, []);

  const EXPLORE_FOOD = '/explorar/comidas';
  const EXPLORE_DRINK = '/explorar/bebidas';
  const SELECT_ID = pathname === EXPLORE_FOOD ? idMeal : idDrink;
  const headerNFooter = (
    <>
      <Header />
      <Footer />
    </>);

  switch (pathname) {
  case '/explorar':
    return (
      <>
        { headerNFooter }
        <Link to={ EXPLORE_FOOD }>
          <button type="button" data-testid="explore-food">Explorar Comidas</button>
        </Link>
        <Link to={ EXPLORE_DRINK }>
          <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
        </Link>
      </>
    );
  case EXPLORE_DRINK:
  case EXPLORE_FOOD:
    return (
      <>

        { headerNFooter }
        <Link to={ `${pathname}/ingredientes` }>
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        { pathname === EXPLORE_FOOD && (
          <Link to="/explorar/comidas/area">
            <button
              type="button"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>
        )}
        <Link
          to={ `/${pathname.split('/')[2]}/${SELECT_ID}` }
        >
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </>
    );
  case '/explorar/bebidas/ingredientes':
  case '/explorar/comidas/ingredientes':
    return (
      <SearchIngredients pathname={ pathname } />
    );
  case '/explorar/comidas/area':
    return (
      <AreaExplorer />
    );
  default:
    break;
  }
}
