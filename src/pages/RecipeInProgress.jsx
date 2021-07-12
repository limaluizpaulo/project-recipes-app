import React from 'react';
import { useHistory } from 'react-router-dom';
import { Ingredients, Instructions, HeaderRecipes } from '../components';

const Progress = () => {
  const history = useHistory();

  return (
    <div>
      <Ingredients />
      <Instructions />
      <HeaderRecipes />
      <button
        type="button"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>

    </div>

  );
};
export default Progress;
