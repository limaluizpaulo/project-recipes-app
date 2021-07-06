import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Header, Footer } from '../components';
import fetchRandomRecipe from '../services/api/fetchRandom';

const ExploreMeals = () => {
  const history = useHistory();
  const [meals, setMeals] = useState();

  useEffect(() => {
    const data = async () => setMeals(await fetchRandomRecipe(true));
    data();
  }, []);

  return (
    <main>
      <Header name="Explorar Comidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('./explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('./explorar/comidas/areas') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`./comidas/${meals.meals[0].idMeal}`) }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </main>
  );
};

export default ExploreMeals;
