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
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => setFilter('comida') }
      >
        Food
      </button>
      <button
        type="button"
        onClick={ () => setFilter('bebida') }
      >
        Drinks
      </button>
      <FavoriteRecipesList filter={ filter } />
    </main>
  );
}

export default Favorites;
