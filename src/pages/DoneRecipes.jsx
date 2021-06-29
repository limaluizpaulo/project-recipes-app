import React from 'react';
import DoneRecipesList from '../components/DoneRecipesList';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <div>
      RECEITAS FEITAS
      <Header />
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
        Drink
      </button>
      <DoneRecipesList />
    </div>
  );
}

export default DoneRecipes;
