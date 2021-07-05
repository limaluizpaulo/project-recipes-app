import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function SearchFoods() {
  SearchFoods.displayName = 'Explorar Comidas';
  return (
    <div>
      <Header title={ SearchFoods.displayName } />
      <Footer />
    </div>
  );
}

export default SearchFoods;
