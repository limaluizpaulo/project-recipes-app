import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Header, Footer } from '../components';
import fetchRandomRecipe from '../services/api/fetchRandom';

const ExploreMeals = () => {
  const [meal, setMeal] = useState();

  useEffect(() => {
    const data = async () => setMeal(await fetchRandomRecipe(true));
    data();
  }, []);

  return (
    <main>
      <Header name="Explorar Comidas" />
      <Link
        data-testid="explore-by-ingredient"
        to="/explorar/comidas/ingredientes"
      >
        Por Ingredientes
      </Link>
      <Link
        data-testid="explore-by-area"
        to="/explorar/comidas/area"
      >
        Por Local de Origem
      </Link>
      <Link
        data-testid="explore-surprise"
        to={ meal ? `/comidas/${meal.idMeal}` : '/' }
      >
        Me Surpreenda!
      </Link>
      <Footer />
    </main>
  );
};

export default ExploreMeals;
