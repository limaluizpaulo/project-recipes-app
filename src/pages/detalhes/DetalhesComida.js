import React from 'react';
import { useParams } from 'react-router-dom';

import RecipeDetails from '../../components/RecipeDetails';
import RecipesCarousel from '../../components/RecipesCarousel';

function DetalhesComida() {
  const { id } = useParams();
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const isDone = doneRecipes.some((item) => item.id === id);

  function renderStartButton() {
    return (
      <button
        type="button"
        className="button-start"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    );
  }

  return (
    <main>
      <RecipeDetails />
      <RecipesCarousel />
      {!isDone && renderStartButton()}
    </main>
  );
}

export default DetalhesComida;
