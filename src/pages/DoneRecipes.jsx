import React from 'react';
import DoneRecipesList from '../components/DoneRecipesList';
import HeaderExplore from '../components/HeaderExplore';

function DoneRecipes() {
  return (
    <div>
      RECEITAS FEITAS
      <HeaderExplore title="Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        // onClick={ }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        // onClick={ }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        // onClick={ }
      >
        Drinks
      </button>
      <DoneRecipesList />
    </div>
  );
}

export default DoneRecipes;
