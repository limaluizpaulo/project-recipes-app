import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { getDataIngredientsList } from '../services/apiRequest';

function ExploreFoodsByIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { path } = useRouteMatch();
  const firstKey = path.includes('/comidas') ? 'meals' : 'drinks';
  const domain = path.includes('/comidas') ? 'themealdb' : 'thecocktaildb';
  const secondKey = path.includes('/comidas') ? 'strIngredient' : 'strIngredient1';

  useEffect(() => {
    getDataIngredientsList(domain).then((result) => setIngredientsList(result[firstKey]));
  }, [domain, firstKey]);

  return (
    <>
      <Header />
      {ingredientsList.map((item, i) => (
        <section key={ i } data-testid={ `${i}-ingredient-card` }>
          <p data-testid={ `${i}-card-name` }>
            {item[secondKey]}
          </p>
          <img
            width="150px"
            data-testid={ `${i}-card-img` }
            src={ `https://www.${domain}.com/images/ingredients/${item[secondKey]}.png` }
            alt={ item[secondKey] }
          />
        </section>
      ))}
      <Footer />
    </>
  );
}

export default ExploreFoodsByIngredients;
