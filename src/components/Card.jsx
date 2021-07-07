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
              <Link to={ `/comidas/${recipe.idMeal}` } data-testid="link-recipe-card">
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
                <h5 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h5>
              </Link>
            </div>
          )
          : (
            <div className="card-field" data-testid={ `${index}-recipe-card` }>
              <Link to={ `/bebidas/${drink.idDrink}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <h5 data-testid={ `${index}-card-name` }>{drink.strDrink}</h5>
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
