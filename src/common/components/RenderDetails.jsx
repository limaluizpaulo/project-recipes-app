import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import RecipeIngredients from './RecipeIngredients';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import RecommendedRecipes from './RecommendedRecipes';
import store from '../../context/store';

export default function RenderDetails() {
  const { recipes: { foods, recipeDetail } } = useContext(store);

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
        <h3>Ingredientes</h3>
        <RecipeIngredients Details />
      </div>
      <div>
        <h3>Instruções</h3>
        <p data-testid="instructions">{ recipeDetail.strInstructions }</p>
      </div>
      {(foods) ? (
        <div>
          <h3>Vídeo</h3>
          <iframe
            title="recipeVideo"
            data-testid="video"
            width="560"
            height="315"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media"
            src={ recipeDetail.strYoutube.replace('watch?v=', 'embed/') }
          />
        </div>
      ) : ('')}
      <h3>Receitas Recomendadas</h3>
      <div className="recommendedRecipes">
        <RecommendedRecipes />
      </div>
      <Link
        to={ (foods) ? (
          `/comidas/${recipeDetail.idMeal}/in-progress`) : (
          `/bebidas/${recipeDetail.idDrink}/in-progress`) }
      >
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </Link>
    </div>
  );

  return (
    renderRecipe()
  );
}
