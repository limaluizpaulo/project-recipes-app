import React, { useContext, useState } from 'react';
import store from '../../context/store';
import { setStorage } from '../../functions';

export default function RecipeIngredients({ inProg, setIngrOK, ingrOK }) {
  const { recipes: { recipeDetail } } = useContext(store);

  // INGREDIENTS FOR IN PROGRESS PAGE ---------------------------------------------------------------------------------------------
  const [taskOK, setTaskOK] = useState({});

  const addTaskCompleted = ({ target: { checked, name } }) => {
    const setTaskCompleted = { ...taskOK, [name]: checked };

    setTaskOK(setTaskCompleted);

    const ingredientsOK = Object.keys(setTaskCompleted)
      .filter((ingredient) => {
        if (setTaskCompleted[ingredient]) {
          return ingredient;
        }
        return '';
      });
    setIngrOK(ingredientsOK);
    setStorage('inProgressRecipes', {
      [recipeDetail.idMeal || recipeDetail.idDrink]: ingredientsOK });
  };

  const renderIngredientsInProgress = () => {
    const ingredients = Object.keys(recipeDetail)
      .filter((item) => item.includes('strIngredient'))
      .map((ingredient) => recipeDetail[ingredient])
      .filter((ingredient) => ingredient);

    const measures = Object.keys(recipeDetail)
      .filter((item) => item.includes('strMeasure'))
      .map((measure) => recipeDetail[measure])
      .filter((measure) => measure);

    return (
      ingredients.map((ingredient, i) => {
        const task = `${ingredient}: ${measures[i]}`;
        return (
          <div key={ i }>
            <label
              htmlFor={ `${i}-ingredient-step` }
              className={ (taskOK[task]) ? 'completedRecipe' : '' }
              data-testid={ `${i}-ingredient-step` }
            >
              <input
                type="checkbox"
                name={ task }
                id={ `${i}-ingredient-step` }
                checked={ ingrOK.includes(task) }
                onClick={ addTaskCompleted }
                onChange={ () => {} }
              />
              {task}
            </label>
          </div>
        );
      })
    );
  };
  // ---------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  // ---------------------------------------------------------------------------------------------
  // RENDERS
  if (inProg) return (renderIngredientsInProgress());
}
