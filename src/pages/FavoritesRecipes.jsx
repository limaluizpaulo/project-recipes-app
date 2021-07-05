import React from 'react';
import HeaderSearch from '../components/HeaderSearch';

export default function FavoritesRecipes() {
  return (
    <div>
      <HeaderSearch title="Receitas Favoritas" />
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
