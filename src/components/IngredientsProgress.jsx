import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { UserContext } from '../context/UserProvider';

import '../styles/IngredientsProgress.css';

const IngredientsProgress = ({ newObj }) => {
  const { type, ingredients, measures, id } = newObj;
  const {
    inProgressRecipes,
    addIngredientInProgress,
    removeIngredientInProgress,
  } = useContext(UserContext);

  const key = type === 'comida' ? 'meals' : 'cocktails';

  return (
    <section>
      <h3>Ingredients</h3>
      <ol>
        {ingredients
          && ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className={ inProgressRecipes[key][id]
              && !!inProgressRecipes[key][id].includes(ingredient)
              && 'ingredient-crossed' }

            >
              <input
                type="checkbox"
                name={ ingredient }
                checked={
                  inProgressRecipes[key][id]
                  && !!inProgressRecipes[key][id].includes(ingredient)
                }
                onChange={ ({ target: { name, checked } }) => (checked
                  ? addIngredientInProgress(type, id, name)
                  : removeIngredientInProgress(type, id, name)) }
              />
              {`- ${ingredient} ${measures[index]}`}
            </li>
          ))}
      </ol>
    </section>
  );
};
// setOnlocalStorage('inProgressRecipes', inProgressRecipes);
// JSON.parse(localStorage.getItem('state'));
IngredientsProgress.propTypes = {
  ingredients: PropTypes.string,
  obj: PropTypes.object,
}.isRequired;

export default IngredientsProgress;
