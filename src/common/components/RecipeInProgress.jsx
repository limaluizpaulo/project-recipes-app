import React, { useContext, useState } from 'react';
import store from '../../context/store';

export default function RecipeInProgress() {
  const [taskOK, setTaskOk] = useState({});
  const { recipes: { recipeDetail } } = useContext(store);

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
            htmlFor={ `${ingredient}${i}` }
            className={ taskOK[`${ingredient}${i}`] && 'completedRecipe' }
          >
            <input
              type="checkbox"
              data-testid={ `${i + 1}-ingredient-step` }
              name={ `${ingredient}${i}` }
              id={ `${ingredient}${i}` }
              onClick={ addTaskCompleted }
            />
            {ingredient}
            -
            {measures[i]}
          </label>
        </div>
      ))
    );
  };

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
          <div>
            <h1 data-testid="recipe-title">
              { recipeDetail.strMeal || recipeDetail.strDrink }
            </h1>
            <h5 data-testid="recipe-category">
              Categoria:
              { recipeDetail.strCategory }
            </h5>
          </div>
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
