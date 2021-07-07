import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { getDataIngredientsList } from '../services/apiRequest';

function ExploreFoodsByIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { limit, setIngredientsResults } = useContext(RecipesContext);
  const { path } = useRouteMatch();
  const firstKey = path.includes('/comidas') ? 'meals' : 'drinks';
  const domain = path.includes('/comidas') ? 'themealdb' : 'thecocktaildb';
  const secondKey = path.includes('/comidas') ? 'strIngredient' : 'strIngredient1';
  const homePath = path.includes('/comidas') ? '/comidas' : '/bebidas';

  useEffect(() => {
    getDataIngredientsList(domain).then((result) => {
      setIngredientsList(result[firstKey].filter((_el, index) => index < limit));
    });
  }, [domain, firstKey, limit]);

  const handleClick = (ingredient) => {
    setIngredientsResults(ingredient.replace(' ', '_').toLowerCase());
  };

  return (
    <>
      <Header />
      {ingredientsList.map((item, i) => (
        <Link
          onClick={ () => handleClick(item[secondKey]) }
          to={ `${homePath}` }
          key={ i }
        >
          <section data-testid={ `${i}-ingredient-card` }>
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
        </Link>
      ))}
      <Footer />
    </>
  );
}

export default ExploreFoodsByIngredients;
