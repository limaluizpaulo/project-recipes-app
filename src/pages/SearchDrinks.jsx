import React from 'react';
import Header from '../components/Header';

function SearchDrinks() {
  SearchDrinks.displayName = 'Explorar Bebidas';
  return (
    <div>
      <Header title={ SearchDrinks.displayName } />
    </div>
  );
}

export default SearchDrinks;
