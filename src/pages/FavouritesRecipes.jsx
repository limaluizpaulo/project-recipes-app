import React from 'react';
import HeaderExplore from '../components/HeaderExplore';

function FavouritesRecipes() {
  return (
    <div>
      <HeaderExplore title="Receitas Favoritas" />
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
    </div>
  );
}

export default FavouritesRecipes;
