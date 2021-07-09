import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import GoBack from '../components/GoBack';
import UserContext from '../context/user.context';
import { setConstants } from '../helpers';
import RecipeDetails from '../components/RecipeDetails';

function Details() {
  const { done, inProgress, setInProgress } = useContext(UserContext);
  const { location: { pathname }, push } = useHistory();
  const { id } = useParams();

  const isDrinks = pathname.includes('bebidas');
  const { localStorageKey, typePt } = setConstants(isDrinks);

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
      newObj[localStorageKey][id] = [];
      setInProgress(newObj);
    }
    push(`/${typePt}/${id}/in-progress`);
  }

  function renderRecipeButton() {
    return (
      <button
        type="button"
        className="details-button"
        onClick={ handleClick }
      >
        {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    );
  }

  return (
    <main>
      <GoBack />
      <RecipeDetails />
      {!isDone && renderRecipeButton()}
    </main>
  );
}

export default Details;
