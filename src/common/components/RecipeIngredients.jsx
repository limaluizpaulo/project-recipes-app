import React, { useContext, useEffect, useState } from 'react';
import store from '../../context/store';
import { getStorage, setStorage } from '../../functions';

export default function RecipeIngredients({
  inProg, setIngrLS, ingrLS, Details }) { // Desestruturação da Props
  const { recipes: { recipeDetail } } = useContext(store);

  // INGREDIENTS FOR IN-PROGRESS PAGE ---------------------------------------------------------------------------------------------
  const [taskOK, setTaskOK] = useState({});
  const [inProgress] = useState(() => getStorage('inProgressRecipes'));

  const ajustItensFromLocalStorage = () => {
    if (ingrLS) {
      const setTaskCompleted = ingrLS.reduce((acc, currItem) => ({
        ...acc,
        [currItem]: true,
      }), {});
      return setTaskOK(setTaskCompleted);
    }
  };
  // transformar array em objeto: https://www.codegrepper.com/code-examples/javascript/transformar+array+em+objeto+javascript

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
    setIngrLS(ingredientsOK);
    setStorage('inProgressRecipes', { ...inProgress,
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
                checked={ ingrLS.includes(task) }
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

  // INGREDIENTS FOR DETAILS PAGE ---------------------------------------------------------------------------------------------

  const renderIngredientsInDetails = () => {
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
            <p
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {task}
            </p>
          </div>
        );
      })
    );
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(ajustItensFromLocalStorage, []);

  // ---------------------------------------------------------------------------------------------
  // RENDERS
  if (inProg) return (renderIngredientsInProgress());
  if (Details) return (renderIngredientsInDetails());
}
