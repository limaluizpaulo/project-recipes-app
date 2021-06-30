import React from 'react';
import Header from '../components/Header';

function SearchFoods() {
  SearchFoods.displayName = 'Explorar Comidas';
  return (
    <div>
      <Header title={ SearchFoods.displayName } />
    </div>
  );
}

export default SearchFoods;
