import React, { useContext } from 'react';
import store from '../../context/store';
import ShareLikeButton from './ShareLikeButton';

export default function RenderRecipe({ renderIngredients }) { // Desestruturando Props
  const { recipes: { recipeDetail } } = useContext(store);
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
