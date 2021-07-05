import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function IngredientCard({ index, ingredient }) {
  const { location: { pathname } } = useHistory();
  return (
    <section data-testid={ `${index}-ingredient-card` }>
      {
        pathname.includes('/comidas')
          ? (
            <Link to="/comidas">
              <img data-testid={ `${index}-card-img` } src={ `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` } alt={ ingredient } />
              <h6 data-testid={ `${index}-card-name` }>{ingredient}</h6>
            </Link>
          )
          : (
            <Link to="/bebidas">
              <img data-testid={ `${index}-card-img` } src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` } alt={ ingredient } />
              <h6 data-testid={ `${index}-card-name` }>{ingredient}</h6>
            </Link>
          )
      }
    </section>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
};

export default IngredientCard;
