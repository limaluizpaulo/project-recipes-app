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
      <DoneRecipesList filter={ filter } />
    </main>
  );
}

export default Done;
