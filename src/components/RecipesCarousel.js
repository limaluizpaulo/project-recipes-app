import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import { getRecipes, setConstants } from '../helpers';
import './RecipesCarousel.css';

function RecipesCarousel() {
  const MAX_CARDS = 6;
  const { drinks, setDrinks } = useContext(DrinksContext);
  const { meals, setMeals } = useContext(MealsContext);
  const { location: { pathname }, push } = useHistory();

  const isDrinks = pathname.includes('comidas');
  const { idKey, imgKey, nameKey, type, typePt } = setConstants(isDrinks);
  const recipes = isDrinks ? [...drinks] : [...meals];
  const setFn = isDrinks ? setDrinks : setMeals;

  useEffect(() => {
    getRecipes({ type, setFn });
  }, [type, setFn]);

  return (
    <section className="carousel">
      {recipes.map((item, index) => {
        if (index < MAX_CARDS) {
          return (
            <button
              type="button"
              className="card carousel-card"
              key={ index }
              onClick={ () => push(`/${typePt}/${item[idKey]}`) }
            >
              <img
                className="card-image"
                src={ item[imgKey] }
                alt={ item[nameKey] }
              />
              <span>{item[nameKey]}</span>
            </button>
          );
        }
        return null;
      })}
    </section>
  );
}

export default RecipesCarousel;
