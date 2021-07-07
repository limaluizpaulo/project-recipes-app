import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Card({ drink, recipe, index }) {
  const { location: { pathname } } = useHistory();
  return (
    <section>
      {
        pathname.includes('/comidas')
          ? (
            <div className="card-field" data-testid={ `${index}-recipe-card` }>
              <Link className="card-name" to={ `/comidas/${recipe.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
                <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
              </Link>
            </div>
          )
          : (
            <div className="card-field" data-testid={ `${index}-recipe-card` }>
              <Link className="card-name" to={ `/bebidas/${drink.idDrink}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
              </Link>
            </div>
          )
      }
    </section>
  );
}

Card.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
  }),
  drink: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
  }),
  index: PropTypes.number,
}.isRequired;

export default Card;
