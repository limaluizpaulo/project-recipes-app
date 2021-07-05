import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import RecipeDetails from '../components/RecipeDetails';
import RecipesCarousel from '../components/RecipesCarousel';

function Details() {
  const history = useHistory();
  const { location: { pathname }, push } = history;
  const { id } = useParams();

  const isDrinks = pathname.includes('bebidas');
  const typeKey = isDrinks ? 'cocktails' : 'meals';

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const isDone = doneRecipes.some((item) => item.id === id);

  const initialObj = { cocktails: {}, meals: {} };
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || initialObj;
  const inProgressIds = [];

  if (Object.keys(inProgressRecipes).includes('cocktails')) {
    inProgressIds.push(Object.keys(inProgressRecipes.cocktails));
  }
  if (Object.keys(inProgressRecipes).includes('meals')) {
    inProgressIds.push(Object.keys(inProgressRecipes.meals));
  }

  const inProgress = inProgressIds.some((item) => Number(item) === Number(id));

  function handleClick() {
    if (!inProgress) {
      console.log(inProgressRecipes, typeKey);
      inProgressRecipes[typeKey][id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
    push(`${pathname}/in-progress`);
  }

  function renderStartButton() {
    return (
      <button
        type="button"
        className="button-start"
        onClick={ handleClick }
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

export default Details;
