import React from 'react';
import PropTypes from 'prop-types';
// import 'App.css'

function BtnIniciarReceita({ id }, { history }) {
  const startedRecipes = JSON.parse(localStorage.getItem('startedRecipes'));
  const receitaIniciada = [];
  const finishedRecipes = JSON.parse(localStorage.getItem('finishedRecipes'));
  const receitaFinalizada = [];

  const startRecipe = () => {
    receitaIniciada.push(id);
    localStorage
      .setItem('startedRecipes', JSON.stringify([...startedRecipes, ...receitaIniciada]));
    history.push(`comidas/${id}/in-progress`);
  };

  const finishRecipe = () => {
    receitaFinalizada.push(id);
    localStorage
      .setItem('finishedRecipes', JSON.stringify([...finishedRecipes, ...receitaFinalizada]));
  };

  let btnText = 'Iniciar receita';
  const btn = document.getElementById('recipe-btn');
  const verifyLocalStorage = () => {
    if (startedRecipes.includes(id)) {
      btnText = 'Continuar receita';
    }
    if (finishedRecipes.includes(id)) {
      btn.classList.add('invisible');
    }
  };

  verifyLocalStorage();

  return (
    <div>
      <button
        type="button"
        id="recipe-btn"
        data-testid="start-recipe-btn"
        onClick={ startRecipe }
      >
        { btnText }
      </button>
      <button
        type="button"
        onClick={ finishRecipe }
      >
        Finalizar receita
      </button>
    </div>
  );
}

BtnIniciarReceita.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default BtnIniciarReceita;
