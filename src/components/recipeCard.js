import React from 'react';
import PropTypes from 'prop-types';

const recipeCard = ({ strMealThumb, strMeal }, index) => {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt={ strMeal } />
      <p data-testid={ `${index}-card-name` }>{strMeal}</p>
    </div>
  );
};

recipeCard.propTypes = {
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
};

export default recipeCard;
