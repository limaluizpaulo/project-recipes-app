import React from 'react';
import { useHistory } from 'react-router-dom';

function Card({ drink, recipe, index }) {
  const { location: { pathname } } = useHistory();
  return (
    <section>
      {
        pathname.includes('/comidas')
          ? (
            <div data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
              />
            </div>
          )
          : (
            <div data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
            </div>
          )
      }
    </section>
  );
}

export default Card;
