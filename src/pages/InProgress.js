import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DetailsContext from '../context/details.context';
import UserContext from '../context/user.context';
import { getDetails } from '../helpers';
import RecipeInProgress from '../components/RecipeInProgress';

function InProgress() {
  const { details, setDetails, ingredients } = useContext(DetailsContext);
  const { done, setDone, inProgress, setInProgress } = useContext(UserContext);
  const { location: { pathname }, push } = useHistory();
  const { id } = useParams();

  const isDrinks = pathname.includes('bebidas');
  const idKey = isDrinks ? 'idDrink' : 'idMeal';
  const imgKey = isDrinks ? 'strDrinkThumb' : 'strMealThumb';
  const nameKey = isDrinks ? 'strDrink' : 'strMeal';
  const type = isDrinks ? 'drinks' : 'meals';
  const typeCypress = isDrinks ? 'bebida' : 'comida';
  const typeKey = isDrinks ? 'cocktails' : 'meals';

  function finishRecipe() {
    const recipesInProgress = { ...inProgress };
    delete recipesInProgress[typeKey][id];
    setInProgress(recipesInProgress);

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
    if (details[idKey] !== id) getDetails({ id, type, setDetails });
  }, [details, setDetails, id, type, idKey]);

  function renderFinishButton() {
    const usedIngredients = inProgress[typeKey][id] || [];
    const isFinished = ingredients.length === usedIngredients.length;

    return (
      <button
        type="button"
        className="button-recipe"
        onClick={ finishRecipe }
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
