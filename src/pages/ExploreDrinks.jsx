import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Header, Footer } from '../components';
import fetchRandomRecipe from '../services/api/fetchRandom';

const ExploreDrinks = () => {
  const [drink, setDrink] = useState();

  useEffect(() => {
    const data = async () => setDrink(await fetchRandomRecipe(false));
    data();
  }, []);

  return (
    <main>
      <Header name="Explorar Bebidas" />
      <Link
        data-testid="explore-by-ingredient"
        to="/explorar/bebidas/ingredientes"
      >
        Por Ingredientes
      </Link>
      <Link
        data-testid="explore-surprise"
        to={ (drink) ? `/bebidas/${drink.idDrink}` : '' }
      >
        Me Surpreenda!
      </Link>
      <Footer />
    </main>
  );
};

export default ExploreDrinks;
