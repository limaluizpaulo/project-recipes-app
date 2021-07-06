import React, { Redirect } from 'react';
import { Ingredients, Instructions, HeaderRecipes } from '../components';

const Progress = () => (
  <div>
    <Ingredients />
    <Instructions />
    <HeaderRecipes />
    <button
      type="button"
      onClick={ () => (<Redirect to="/receitas-feitas" />) }
    >
      Finalizar Receita
    </button>
  </div>

);
export default Progress;
