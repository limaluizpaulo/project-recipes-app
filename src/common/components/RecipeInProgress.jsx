import React, { useContext, useEffect, useState } from 'react';
import store from '../../context/store';
import { setStorage } from '../../functions';
import ShareLikeButton from './ShareLikeButton';

export default function RecipeInProgress() {
  const [ingrOK, setIngrOK] = useState();
  const [taskOK, setTaskOk] = useState({});
  const { recipes: { recipeDetail, foods } } = useContext(store);

  console.log(ingrOK);

  const setIngredientsOK = () => {
    const ingredientsOK = Object.keys(taskOK)
      .filter((ingredient) => {
        if (taskOK[ingredient]) {
          return ingredient;
        }
        return '';
      });
    setIngrOK(ingredientsOK);
    setStorage('inProgressRecipes', {
      cocktails: { [recipeDetail.idDrink || '']: (!foods) ? ingredientsOK : '' },
      meals: { [recipeDetail.idMeal || '']: (foods) ? ingredientsOK : '' },
    });
  };

  const addTaskCompleted = ({ target: { checked, name } }) => {
    setTaskOk({ ...taskOK, [name]: checked });
  };

  const renderIngredients = () => {
    const ingredients = Object.keys(recipeDetail)
      .filter((item) => item.includes('strIngredient'))
      .map((ingredient) => recipeDetail[ingredient])
      .filter((ingredient) => ingredient);

    const measures = Object.keys(recipeDetail)
      .filter((item) => item.includes('strMeasure'))
      .map((measure) => recipeDetail[measure])
      .filter((measure) => measure);

    return (
      ingredients.map((ingredient, i) => (
        <div key={ i }>
          <label
            htmlFor={ ingredient }
            className={ (taskOK[ingredient]) ? 'completedRecipe' : '' }
          >
            <input
              type="checkbox"
              data-testid={ `${i + 1}-ingredient-step` }
              name={ ingredient }
              id={ ingredient }
              onClick={ addTaskCompleted }
            />
            {ingredient}
            :
            {' '}
            {measures[i]}
          </label>
        </div>
      ))
    );
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(setIngredientsOK, [foods, recipeDetail.idDrink, recipeDetail.idMeal, taskOK]);

  // ---------------------------------------------------------------------------------------------

  function renderRecipe() {
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipeDetail.strMealThumb || recipeDetail.strDrinkThumb }
          alt="recipe-img"
          width="350px"
        />
        <div>
          <div className="titleButtons">
            <h1 data-testid="recipe-title">
              { recipeDetail.strMeal || recipeDetail.strDrink }
            </h1>
            <ShareLikeButton />
          </div>
          <h5 data-testid="recipe-category">
            Categoria:
            { recipeDetail.strCategory }
          </h5>
        </div>
        <div>
          <h4>Ingredientes</h4>
          {renderIngredients()}
        </div>
        <div>
          <h4>Instruções</h4>
          <p data-testid="instructions">{ recipeDetail.strInstructions }</p>
        </div>
        <button
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </button>
      </div>
    );
  }

  return (
    renderRecipe()
  );
}
