import React from 'react';
import Header from '../components/Header';

export default function DoneRecipes() {
  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        value="All"
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        value="Food"
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>

    </div>
  );
}
