import React from 'react';
import PropTypes from 'prop-types';

function Ingredients(props) {
  const { value: recipe } = props;
  const object = Object.entries(recipe);
  const recipeIngredients = object.filter((entry) => (
    entry[0].match(/strIngredient/) && entry[1] !== '' && entry[1] !== null));
  const recipeQuantities = object.filter((entry) => (
    entry[0].match(/strMeasure/) && entry[1] !== ' ' && entry[1] !== null));
  const recipeIngredientsList = [];
  for (let i = 0; i < recipeIngredients.length; i += 1) {
    recipeIngredientsList.push(
      `- ${recipeIngredients[i][1]} - ${recipeQuantities[i][1]}`,
    );
  }

  return (
    <div
      className="ingredients"
    >
      <h5>Ingredients</h5>
      <ul>
        {recipeIngredientsList.map((entry, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { entry }
          </li>
        ))}
      </ul>
    </div>
  );
}

Ingredients.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ingredients;
