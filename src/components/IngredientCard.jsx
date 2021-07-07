import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const IngredientCard = ({ type, ingredient, index, set }) => (
  <Link
    to={ type === 'meal' ? '/comidas' : '/bebidas' }
    onClick={ () => set(ingredient) }
    data-testid={ `${index}-ingredient-card` }
  >
    <img
      src={ `https://www.the${type}db.com/images/ingredients/${ingredient}-Small.png` }
      alt=""
      data-testid={ `${index}-card-img` }
    />
    <h4 data-testid={ `${index}-card-name` }>
      {ingredient}
    </h4>
  </Link>
);

IngredientCard.propTypes = {
  type: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  set: PropTypes.func.isRequired,
};

export default IngredientCard;
