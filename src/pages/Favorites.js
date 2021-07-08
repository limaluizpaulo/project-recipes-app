import React, { useState } from 'react';

import Header from '../components/Header';
import FavoriteRecipesList from '../components/FavoriteRecipesList';

function Favorites() {
  const [filter, setFilter] = useState('');

  return (
    <main>
      <Header title="Receitas Favoritas" showSearchIcon={ false } />
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
      <FavoriteRecipesList filter={ filter } />
    </main>
  );
}

export default Favorites;
