import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { getRandomRecipe } from '../services/apiRequest';

function ExploreFoods() {
  const [verifyPath, setVerifyPath] = useState(true);
  const [idRandom, setIdRandom] = useState('');
  const { path } = useRouteMatch();
  const firstKey = path.includes('comidas') ? 'meals' : 'drinks';
  const secondKey = path.includes('comidas') ? 'idMeal' : 'idDrink';
  const domain = path.includes('comidas') ? 'themealdb' : 'thecocktaildb';
  const history = useHistory();

  useEffect(() => {
    setVerifyPath(path.includes('comidas'));
  }, [path]);

  useEffect(() => {
    async function getDataRandom() {
      getRandomRecipe(domain)
        .then((result) => setIdRandom(result[firstKey][0][secondKey]));
    }
    getDataRandom();
  }, [firstKey, secondKey, domain]);

  const ingridientPath = path.includes('comidas')
    ? '/explorar/comidas/ingredientes'
    : '/explorar/bebidas/ingredientes';

  function handleSurpriseMe() {
    const randomPath = path.includes('comidas')
      ? `/comidas/${idRandom}`
      : `/bebidas/${idRandom}`;
    history.push(randomPath);
  }

  return (
    <>
      <Header />
      <Link to={ ingridientPath }>
        <Button variant="primary" data-testid="explore-by-ingredient">
          Por Ingredientes
        </Button>
      </Link>
      {verifyPath && (
        <Link to="/explorar/comidas/area">
          <Button variant="primary" data-testid="explore-by-area">
            Por Local de Origem
          </Button>
        </Link>)}
      <Button
        variant="primary"
        data-testid="explore-surprise"
        onClick={ handleSurpriseMe }
      >
        Me Surpreenda!
      </Button>
      <Footer />
    </>
  );
}

export default ExploreFoods;
