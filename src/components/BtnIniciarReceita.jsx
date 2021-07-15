import React from 'react';
import PropTypes from 'prop-types';
// import 'App.css'

function BtnIniciarReceita({ id }, { history }) {
  const startedRecipes = JSON.parse(localStorage.getItem('startedRecipes'));
  const receitaIniciada = [];
  // const finishedRecipes = JSON.parse(localStorage.getItem('finishedRecipes'));
  // const receitaFinalizada = [];

  const startRecipe = () => {
    receitaIniciada.push(id);
    localStorage
      .setItem('startedRecipes', JSON.stringify([...startedRecipes, ...receitaIniciada]));
    history.push(`comidas/${id}/in-progress`);
  };

  // const finishRecipe = () => {
  //   receitaFinalizada.push(id);
  //   localStorage
  //     .setItem('finishedRecipes',
  //       JSON.stringify([...finishedRecipes, ...receitaFinalizada]));
  // };

  const verifyLocalStorage = () => {
    if (startedRecipes.includes(id)) {
      btnText = 'Continuar receita';
    }
  };

  verifyLocalStorage();

  function UserGreeting(props) {
    return
    {let btnText = 'Iniciar receita';
    <button
      type="button"
      id ="recipe-btn"
      data-testid="start-recipe-btn"
      onClick={ startRecipe }
    >
      { btnText }
    </button>};
  };
  
  function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
  }

  const btnInvisivel = (props) => {
  };

  const renderBtn = (props) => {
    const isRecipeFinished = props.isLoggedIn;
    if (isRecipeFinished) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }
  };

  return (
    <div>

      {/* <button
        type="button"
        onClick={ finishRecipe }
      >
        Finalizar receita
      </button> */}
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
