import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function SearchFoodsIngredients() {
  SearchFoodsIngredients.displayName = 'Explorar Ingredientes';
  return (
    <div>
      <Header title={ SearchFoodsIngredients.displayName } />
      <Footer />
    </div>
  );
}

export default SearchFoodsIngredients;
