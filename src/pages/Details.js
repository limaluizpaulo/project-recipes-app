import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import RecipeDetails from '../components/RecipeDetails';
import RecipesCarousel from '../components/RecipesCarousel';

function DetalhesBebida() {
  const history = useHistory();
  const { location: { pathname } } = history;
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

  const inProgress = inProgressIds.some((item) => Number(item) === Number(id));

  function renderStartButton() {
    return (
      <button
        type="button"
        className="button-start"
        onClick={ () => history.push(`${pathname}/in-progress`) }
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
