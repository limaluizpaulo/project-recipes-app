import React, { useState } from 'react';

import Header from '../components/Header';
import DoneRecipesList from '../components/DoneRecipesList';

function Done() {
  const [filter, setFilter] = useState('');

  return (
    <main>
      <Header title="Receitas Feitas" showSearchIcon={ false } />
      <button
        type="button"
        onClick={ () => setFilter('') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => setFilter('comida') }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ () => setFilter('bebida') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <DoneRecipesList filter={ filter } />
    </main>
  );
}

export default Done;
