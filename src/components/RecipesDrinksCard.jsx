import React from 'react';
import PropTypes from 'prop-types';

function RecipesDrinksCard({ recipe, index }) {
  const { strDrinkThumb, strDrink } = recipe;

  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{strDrink}</p>
    </div>
  );
}

export default RecipesDrinksCard;

RecipesDrinksCard.propTypes = {
  recipe: PropTypes.objectOf.isRequired,
  index: PropTypes.number.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
};
