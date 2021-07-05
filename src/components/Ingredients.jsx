import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useIngredients from '../hooks/useIngredients';

export default function Ingredients({ recipe, radioBtn }) {
  const [arrChecked, setArrChecked] = useState({});
  const { createIngredientsAndMesure, handleIngredients } = useIngredients();
  const ingredients = createIngredientsAndMesure(recipe, 'ingredients');
  const mesure = createIngredientsAndMesure(recipe, 'mesure');

  return (
    <div>
      {ingredients.map((ingredient, index) => (radioBtn ? (
        <div key={ index } className="ingredients-check">
          <label htmlFor="ingre" data-testid={ `${index}-ingredient-step` }>
            <input
              id={ index }
              value={ index }
              type="checkbox"
              onChange={ (e) => handleIngredients(e, recipe, setArrChecked) }
            />
            {ingredient}
          </label>
        </div>
      ) : (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
          -
          {mesure[index]}
        </p>
      )))}
    </div>
  );
}

Ingredients.defaultProps = {
  radioBtn: null,
};

Ingredients.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
  radioBtn: PropTypes.bool,
};
