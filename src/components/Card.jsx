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
              <Link to={ `/bebidas/${drink.idDrink}` }>
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

Card.propTypes = {
  recipe: PropTypes.objectOf({
    idMeal: PropTypes.number,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
  }).isRequired,
  drink: PropTypes.objectOf({
    idDrink: PropTypes.number,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,

};

export default Card;
