import React, { useState } from 'react';
import DoneCard from '../components/DoneCard';

function DoneRecipes() {
  const [filter, setFilter] = useState('');
  return (
    <div>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('Food') }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('Drinks') }
      >
        Drinks
      </button>

      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('All') }
      >
        All
      </button>
      <DoneCard filter={ filter } />
    </div>
  );
}

export default DoneRecipes;
