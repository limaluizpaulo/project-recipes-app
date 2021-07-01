import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Card({ drink, recipe, index }) {
  const { location: { pathname } } = useHistory();
  return (
    <section data-testid={ `${index}-recipe-card` }>
      {
        pathname.includes('/comidas')
          ? (
            <div className="card-field" data-testid={ `${index}-recipe-card` }>
              <Link to={ `/comidas/${recipe.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
                <h3 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
              </Link>
            </div>
          )
          : (
            <div className="card-field" data-testid={ `${index}-recipe-card` }>
              <Link to={ `/bebidas/${recipe.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
              </Link>
            </div>
          )
      }
    </section>
  );
}

export default Card;
