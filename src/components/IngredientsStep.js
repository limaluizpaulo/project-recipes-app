import React from 'react';
import PropTypes from 'prop-types';

function IngredientsStep(props) {
  const { value: recipe } = props;
  const object = Object.entries(recipe);
  const recipeIngredients = object.filter((entry) => (
    entry[0].match(/strIngredient/) && entry[1] !== '' && entry[1] !== null));
  const recipeQuantities = object.filter((entry) => (
    entry[0].match(/strMeasure/) && entry[1] !== ' ' && entry[1] !== null));
  const recipeIngredientsList = [];
  for (let i = 0; i < recipeIngredients.length; i += 1) {
    recipeIngredientsList.push(
      ` ${recipeIngredients[i][1]} - ${recipeQuantities[i][1]}`,
    );
  }

  return (
    <div
      className="ingredients-step"
    >
      <h5>Ingredients</h5>
      <div className="ingredients-list">
        {recipeIngredientsList.map((entry, index) => (
          <label
            htmlFor={ index }
            key={ index }
          >
            <input
              type="checkbox"
              data-testid={ `${index}-ingredient-step` }
              name={ index }
              key={ index }
              value={ index }
            />
            { entry }
          </label>
        ))}
      </div>
    </div>
  );
}

IngredientsStep.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IngredientsStep;
