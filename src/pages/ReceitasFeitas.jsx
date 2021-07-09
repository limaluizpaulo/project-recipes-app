import React from 'react';
import Header from '../components/Header';
import FiltersButtons from '../components/FiltersButtons';
import DoneRecipes from '../components/DoneRecipes';

function ReceitasFeitas() {
  return (
    <div>
      <Header />
      <FiltersButtons />
      <DoneRecipes />
    </div>
  );
}
export default ReceitasFeitas;
