import React from 'react';
import PropTypes from 'prop-types';

const MealCard = ({ recipe, index }) => {
  const { strMealThumb, strMeal } = recipe;
  return (
    <div key={ `${idx} - meals` } className="cards" data-testid={ `"${index}-recipe-card"` }>
      <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt={ strMeal } />
      <p data-testid={ `${index}-card-name` }>{strMeal}</p>
    </div>
  );
};

MealCard.defaultProps = {
  strMealThumb: '',
  strMeal: '',
};

MealCard.propTypes = {
  strMealThumb: PropTypes.string,
  strMeal: PropTypes.string,
}.isRequired;

export default MealCard;
