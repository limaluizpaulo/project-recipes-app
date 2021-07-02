import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function SearchDrinks() {
  SearchDrinks.displayName = 'Explorar Bebidas';
  return (
    <div>
      <Header title={ SearchDrinks.displayName } />
      <Footer />
    </div>
  );
}

export default SearchDrinks;
