import React from 'react';
import { useHistory } from 'react-router-dom';

function Card({ drink, recipe, index }) {
  const { location: { pathname } } = useHistory();
  return (
    <section>
      {
        pathname.includes('/comidas')
          ? (
            <div>
              <h3 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
              <img src={ recipe.strMealThumb } alt={ recipe.strMeal } />
            </div>
          )
          : (
            <div>
              <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
              <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
            </div>
          )
      }

    </section>
  );
}

export default Card;
