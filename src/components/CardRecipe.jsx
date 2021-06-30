import React from 'react';
import PropTypes from 'prop-types';

export default function CardRecipe({ data, index }) {
  const { strMealThumb, strMeal, strDrink, strDrinkThumb } = data;
  return (
    <div data-testid={ `${index}-recipe-card` } className="recipe-card">
      <img
        className="card_image"
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{strMeal || strDrink}</p>
    </div>
  );
}

CardRecipe.propTypes = {
  data: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
