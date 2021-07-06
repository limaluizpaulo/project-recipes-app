import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DetailsContext from '../context/details.context';
import UserContext from '../context/user.context';
import RecipeInProgress from '../components/RecipeInProgress';

function InProgress() {
  const { inProgress } = useContext(UserContext);
  const { ingredients } = useContext(DetailsContext);
  const { location: { pathname }, push } = useHistory();
  const { id } = useParams();

  const isDrinks = pathname.includes('bebidas');
  const typeKey = isDrinks ? 'cocktails' : 'meals';
  const usedIngredients = inProgress[typeKey][id] || [];

  const isFinished = ingredients.length === usedIngredients.length;

  function handleClick() {
    // const doneRecipe = {
    //   id:
    //   type:
    //   area:
    //   category:
    //   alcoholicOrNot:
    //   name:
    //   image:
    //   doneDate:
    //   tags:
    // }
    push('/receitas-feitas');
  }

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
