import React from 'react';
import { useParams } from 'react-router-dom';

import RecipeDetails from '../components/RecipeDetails';
import RecipesCarousel from '../components/RecipesCarousel';

function DetalhesBebida() {
  const { id } = useParams();

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const isDone = doneRecipes.some((item) => item.id === id);

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  const inProgressIds = [];

  if (Object.keys(inProgressRecipes).includes('cocktails')) {
    inProgressIds.push(Object.keys(inProgressRecipes.cocktails));
  }
  if (Object.keys(inProgressRecipes).includes('meals')) {
    inProgressIds.push(Object.keys(inProgressRecipes.meals));
  }

  console.log(inProgressIds, id);

  const inProgress = inProgressIds.some((item) => Number(item) === Number(id));

  console.log(inProgress);

  function renderStartButton() {
    return (
      <button
        type="button"
        className="button-start"
        data-testid="start-recipe-btn"
      >
        {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
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

export default DetalhesBebida;
