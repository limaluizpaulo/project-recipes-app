import React from 'react';
import Header from '../components/Header';

function SearchFoodsIngredients() {
  SearchFoodsIngredients.displayName = 'Explorar Ingredientes';
  return (
    <div>
      <Header title={ SearchFoodsIngredients.displayName } />
    </div>
  );
}

export default SearchFoodsIngredients;
