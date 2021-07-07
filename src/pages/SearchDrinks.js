import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SearchDrinks = () => {
  console.log('');
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <button data-testid="explore-by-ingredient" type="button">Por Ingredientes</button>
      <button data-testid="explore-surprise" type="button">Me Surpreenda!</button>
      <Footer />
    </div>
  );
};

export default SearchDrinks;
