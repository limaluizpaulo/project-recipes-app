import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IngredientsProgress, Instructions, HeaderRecipes } from '../components';

const Progress = ({ state }) => {
  const history = useHistory();

  const location = useLocation();
  console.log(location.state.newObj);
  return (
    <div>
      <HeaderRecipes newObj={ location.state.newObj } />
      <Instructions newObj={ location.state.newObj } />
      <IngredientsProgress newObj={ location.state.newObj } />
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
