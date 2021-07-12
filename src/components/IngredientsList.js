import React, { useContext } from 'react';
import RecipeContext from '../context';
import createListIngredients from '../helpers/ingredientsList';

function IngredientsList() {
  const { recipes } = useContext(RecipeContext);
  return (
    <ul>
      { createListIngredients(recipes).map((ingredient, index) => (
        <li
          key={ ingredient }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
        </li>
      ))}
    </ul>
  );
}

export default IngredientsList;
