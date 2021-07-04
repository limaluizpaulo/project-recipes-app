import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import store, { addDoneRecipe } from '../../context/store';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';

export default function RenderRecipe({ renderIngredients, ingrOK }) { // Desestruturando Props
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { recipes: { recipeDetail }, setRecipes } = useContext(store);

  const validationButton = () => {
    const ingredients = Object.keys(recipeDetail)
      .filter((item) => item.includes('strIngredient'))
      .map((ingredient) => recipeDetail[ingredient])
      .filter((ingredient) => ingredient);

    if (ingredients.length === ingrOK.length) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  const renderRecipe = () => (
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
          <span className="likeShareBtns">
            <ShareButton />
            <LikeButton recipe={ recipeDetail } />
          </span>
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
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disabledBtn }
          onClick={ () => setRecipes(addDoneRecipe(recipeDetail)) }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(validationButton, [ingrOK, recipeDetail]);

  // ---------------------------------------------------------------------------------------------

  return (
    renderRecipe()
  );
}
