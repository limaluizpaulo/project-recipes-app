import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DetailsContext from '../context/details.context';
import UserContext from '../context/user.context';
import RecipeInProgress from '../components/RecipeInProgress';

function InProgress() {
  const { done, setDone, inProgress, setInProgress } = useContext(UserContext);
  const {
    details,
    ingredients,
    setContentParams,
    nameKey,
    typeCypress,
    typeKey,
    imgKey,
    usedIngredients,
  } = useContext(DetailsContext);
  const { location: { pathname }, push } = useHistory();
  const { id } = useParams();

  const isFinished = ingredients.length === usedIngredients.length;

  function handleClick() {
    const recipesInProgress = { ...inProgress };
    delete recipesInProgress[typeKey][id];
    setInProgress(recipesInProgress);

    console.log(details);

    const newRecipe = {
      alcoholicOrNot: details.strAlcoholic || '',
      area: details.strArea || '',
      category: details.strCategory,
      doneDate: new Date().toLocaleDateString(),
      id,
      image: details[imgKey],
      name: details[nameKey],
      tags: details.strTags ? details.strTags.split(',') : [],
      type: typeCypress,
    };
    const doneRecipes = done.concat(newRecipe);
    setDone(doneRecipes);

    push('/receitas-feitas');
  }

  useEffect(() => {
    setContentParams({ id, pathname });
  }, [id, pathname, setContentParams]);

  function renderFinishButton() {
    return (
      <button
        type="button"
        className="button-recipe"
        onClick={ handleClick }
        disabled={ !isFinished }
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    );
  }

  return (
    <main>
      <RecipeInProgress />
      {renderFinishButton()}
    </main>
  );
}

export default InProgress;
