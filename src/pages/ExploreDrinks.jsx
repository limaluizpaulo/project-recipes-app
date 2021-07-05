import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Header, Footer } from '../components';
import fetchRandomRecipe from '../services/api/fetchRandom';

const ExploreDrinks = () => {
  const history = useHistory();
  const [drinks, setDrinks] = useState();

  useEffect(() => {
    const data = async () => setDrinks(await fetchRandomRecipe(false));
    data();
  }, []);

  return (
    <main>
      <Header name="Explorar Bebidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('./explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`./bebidas/${drinks.drinks[0].idDrink}`) }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </main>
  );
};

export default ExploreDrinks;
