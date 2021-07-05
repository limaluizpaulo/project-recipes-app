import React from 'react';
import { useHistory } from 'react-router-dom';

import RecipeInProgress from '../../components/RecipeInProgress';

function DetalhesBebida() {
  const history = useHistory();
  const { push } = history;

  function handleClick() {
    push('/receitas-feitas');
  }

  function renderFinishButton() {
    return (
      <button
        type="button"
        className="button-start"
        onClick={ handleClick }
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

export default DetalhesBebida;
