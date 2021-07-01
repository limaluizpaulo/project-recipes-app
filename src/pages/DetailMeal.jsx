import React, { useContext } from 'react';
import { RecipeDetailContext } from '../context';

export default function DetailMeal() {
  const { recipeDetail } = useContext(RecipeDetailContext);

  function listIngredients(recipe) {
    const list = [];

    list.push(Object.entries(recipe)
      .filter((ingredient) => (
        ingredient[0].includes('strIngredient')
      ))
      .map((setIngredients) => (
        setIngredients[1].length > 0 && setIngredients[1]
      ))
      .filter((finalList) => finalList !== false));

    list.push(Object.entries(recipe)
      .filter((ingredient) => (
        ingredient[0].includes('strMeasure')
      ))
      .map((setIngredients) => (
        setIngredients[1].length > 1 && setIngredients[1]
      ))
      .filter((finalList) => finalList !== false));

    return list;
  }

  return (
    <div>
      {recipeDetail.length > 0 && (
        <div>
          {console.log()}
          <h2 data-testid="recipe-title">{ recipeDetail[0].strMeal }</h2>
          <img
            src={ recipeDetail[0].strMealThumb }
            alt={ recipeDetail[0].strMeal }
            data-testid="recipe-photo"
          />
          <button
            type="button"
            data-testid="share-btn"
          >
            Compartilhar
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favoritar
          </button>
          <p data-testid="recipe-category">{ recipeDetail[0].strCategory }</p>
          <ul>
            {
              listIngredients(recipeDetail[0])[0].map((ing, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${ing}: ${listIngredients(recipeDetail[0])[1][index]}`}
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions">{recipeDetail[0].strInstructions}</p>
          <iframe
            data-testid="video"
            title="Video"
            width="420"
            height="315"
            src={ recipeDetail[0].strYoutube }
          />
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Iniciar
          </button>
        </div>
      )}
    </div>
  );
}
