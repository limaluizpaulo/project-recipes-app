import React, { useState } from 'react';

import Header from '../components/Header';
import DoneRecipesList from '../components/DoneRecipesList';

function Done() {
  const [filter, setFilter] = useState('');
  const altClass = 'category-button-alt';
  const mainClass = 'category-button';

  return (
    <main>
      <Header title="Done Recipes" showSearchIcon={ false } />
      <section className="category-buttons-container">
        <button
          type="button"
          className={ !filter ? altClass : mainClass }
          onClick={ () => setFilter('') }
        >
          All
        </button>
        <button
          type="button"
          className={ filter === 'comida' ? altClass : mainClass }
          onClick={ () => setFilter('comida') }
        >
          Food
        </button>
        <button
          type="button"
          className={ filter === 'bebida' ? altClass : mainClass }
          onClick={ () => setFilter('bebida') }
        >
          Drinks
        </button>
      </section>
      <DoneRecipesList filter={ filter } />
    </main>
  );
}

export default Done;
