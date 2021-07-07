import React from 'react';
import DoneRecipesList from '../components/DoneRecipesList';
import HeaderExplore from '../components/HeaderExplore';

function DoneRecipes() {
  return (
    <div>
      {/* RECEITAS FEITAS */}
      <HeaderExplore title="Receitas Feitas" />
      <DoneRecipesList />
    </div>
  );
}

export default DoneRecipes;
