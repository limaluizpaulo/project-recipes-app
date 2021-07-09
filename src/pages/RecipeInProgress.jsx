import React, { Redirect } from 'react';
import { IngredientsProgress, Instructions, HeaderRecipes } from '../components';

const Progress = () => (
  <div>
    <IngredientsProgress />
    <Instructions />
    <HeaderRecipes />
    <button
      type="button"
      onClick={ () => (<Redirect to="/receitas-feitas" />) }
      data-testid="finish-recipe-btn"
    >
      Finalizar Receita
    </button>
  </div>

);
export default Progress;
