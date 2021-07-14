import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { fetchRandomMeal } from '../Service/foodApi';
import { fetchRandomDrink } from '../Service/drinkApi';
import explore from '../images/explore.png';

import Footer from '../components/Footer';
import Header from '../components/Header';
import AreaExplorer from '../components/AreaExplorer';
import SearchIngredients from './SearchIngredients';
import NotFound from './NotFound';

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
      <div className="explore">
        { headerNFooter }
        <img className="imgExplore" src={ explore } alt="explore" />
        <div className="containerButtons ">
          <Link to={ EXPLORE_FOOD }>
            <Button
              variant="outline-danger"
              type="button"
              data-testid="explore-food"
            >
              Explorar Comidas

            </Button>
          </Link>
          <Link to={ EXPLORE_DRINK }>
            <Button
              variant="outline-danger"
              type="button"
              data-testid="explore-drinks"
            >
              Explorar Bebidas

            </Button>
          </Link>
        </div>
      </div>
    );
  case EXPLORE_DRINK:
  case EXPLORE_FOOD:
    return (
      <div className="explore">
        { headerNFooter }
        <img className="imgExplore" src={ explore } alt="explore" />
        <div className="containerButtons">
          <Link to={ `${pathname}/ingredientes` }>
            <Button
              variant="outline-danger"
              type="button"
              data-testid="explore-by-ingredient"
            >
              Ingredientes
            </Button>
          </Link>
          { pathname === EXPLORE_FOOD && (
            <Link to="/explorar/comidas/area">
              <Button
                variant="outline-danger"
                type="button"
                data-testid="explore-by-area"
              >
                Local
              </Button>
            </Link>
          )}
          <Link
            to={ `/${pathname.split('/')[2]}/${SELECT_ID}` }
          >
            <Button
              variant="outline-danger"
              type="button"
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </Button>
          </Link>
        </div>
      </div>
    );
  case '/explorar/bebidas/ingredientes':
  case '/explorar/comidas/ingredientes':
    return (
      <SearchIngredients />
    );
  case '/explorar/comidas/area':
    return (
      <AreaExplorer />
    );
  case '/explorar/bebidas/area':
    return (
      <NotFound />
    );
  default:
    break;
  }
}
