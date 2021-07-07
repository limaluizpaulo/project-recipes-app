import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { getDataIngredientsList } from '../services/apiRequest';

function ExploreFoodsByIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { limit } = useContext(RecipesContext);
  const { path } = useRouteMatch();
  const firstKey = path.includes('/comidas') ? 'meals' : 'drinks';
  const domain = path.includes('/comidas') ? 'themealdb' : 'thecocktaildb';
  const secondKey = path.includes('/comidas') ? 'strIngredient' : 'strIngredient1';

  useEffect(() => {
    getDataIngredientsList(domain).then((result) => {
      setIngredientsList(result[firstKey].filter((_el, index) => index < limit));
    });
  }, [domain, firstKey, limit]);

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
            src={ `https://www.${domain}.com/images/ingredients/${item[secondKey]}-Small.png` }
            alt={ item[secondKey] }
          />
        </section>
      ))}
      <Footer />
    </>
  );
}

export default ExploreFoodsByIngredients;
