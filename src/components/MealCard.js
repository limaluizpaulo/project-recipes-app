import React from 'react';
import PropTypes from 'prop-types';

const MealCard = ({ recipe, index }) => {
  const { strMealThumb, strMeal } = recipe;
  return (
    <div className="cards" data-testid={ `${index}-recipe-card` }>
      {/* `[data-testid="${index}-recipe-card"]` */}
      <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt={ strMeal } />
      <div className="container">
        <p data-testid={ `${index}-card-name` }>{strMeal}</p>
      </div>
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
