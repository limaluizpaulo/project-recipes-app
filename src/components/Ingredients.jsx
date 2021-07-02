import React from 'react';
import PropTypes from 'prop-types';
import useIngredients from '../hooks/useIngredients';

export default function Ingredients({ recipe }) {
  const { createIngredientsAndMesure } = useIngredients();
  const ingredients = createIngredientsAndMesure(recipe, 'ingredients');
  const mesure = createIngredientsAndMesure(recipe, 'mesure');

  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
          {' '}
          -
          {' '}
          {mesure[index]}
        </p>
      ))}
    </div>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
};
