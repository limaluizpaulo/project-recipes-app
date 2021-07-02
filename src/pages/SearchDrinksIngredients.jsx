import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function SearchDrinksIngredients() {
  SearchDrinksIngredients.displayName = 'Explorar Ingredientes';
  return (
    <div>
      <Header title={ SearchDrinksIngredients.displayName } />
      <Footer />
    </div>
  );
}

export default SearchDrinksIngredients;
