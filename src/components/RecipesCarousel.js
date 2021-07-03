import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import './RecipesCarousel.css';

function RecipesCarousel() {
  const MAX_CARDS = 6;
  let { drinks } = useContext(DrinksContext);
  let { meals } = useContext(MealsContext);
  const { location: { pathname }, push } = useHistory();

  // Cypress bug
  if (!drinks) drinks = [];
  if (!meals) meals = [];

  const isDrinks = pathname.includes('comidas');
  const recipes = isDrinks ? [...drinks] : [...meals];
  const typePt = isDrinks ? 'bebidas' : 'comidas';
  const idKey = isDrinks ? 'idDrink' : 'idMeal';
  const nameKey = isDrinks ? 'strDrink' : 'strMeal';
  const imgKey = isDrinks ? 'strDrinkThumb' : 'strMealThumb';

  return (
    <div className="carousel">
      {recipes.map((item, index) => {
        if (index < MAX_CARDS) {
          return (
            <button
              type="button"
              className="card carousel-card"
              key={ index }
              onClick={ () => push(`/${typePt}/${item[idKey]}`) }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="card-image"
                src={ item[imgKey] }
                alt={ item[nameKey] }
                data-testid={ `${index}-card-img` }
              />
              <span data-testid={ `${index}-recomendation-title` }>{item[nameKey]}</span>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}

export default RecipesCarousel;
