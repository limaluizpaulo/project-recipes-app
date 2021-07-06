import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import UserContext from '../context/user.context';
import RecipeDetails from '../components/RecipeDetails';
import RecipesCarousel from '../components/RecipesCarousel';

function Details() {
  const { done, inProgress, setInProgress } = useContext(UserContext);
  const { location: { pathname }, push } = useHistory();
  const { id } = useParams();

  const isDrinks = pathname.includes('bebidas');
  const typeKey = isDrinks ? 'cocktails' : 'meals';
  const typePt = isDrinks ? 'bebidas' : 'comidas';
  const isDone = done.some((item) => item.id === id);

  let inProgressIds = [];
  if (Object.keys(inProgress).includes('cocktails')) {
    inProgressIds = [...Object.keys(inProgress.cocktails)];
  }
  if (Object.keys(inProgress).includes('meals')) {
    inProgressIds = [...inProgressIds, ...Object.keys(inProgress.meals)];
  }

  const isInProgress = inProgressIds.some((item) => Number(item) === Number(id));

  function handleClick() {
    if (!isInProgress) {
      const newObj = { ...inProgress };
      newObj[typeKey][id] = [];
      setInProgress(newObj);
    }
    push(`/${typePt}/${id}/in-progress`);
  }

  function renderRecipeButton() {
    return (
      <button
        type="button"
        className="button-recipe"
        onClick={ handleClick }
        data-testid="start-recipe-btn"
      >
        {isInProgress ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    );
  }

  return (
    <main>
      <RecipeDetails />
      <RecipesCarousel />
      {!isDone && renderRecipeButton()}
    </main>
  );
}

export default Details;
