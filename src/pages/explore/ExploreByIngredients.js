import React from 'react';

import Header from '../../components/Header';
import IngredientsList from '../../components/IngredientsList';
import Footer from '../../components/Footer';

function ExploreByIngredients() {
  return (
    <div>
      <Header title="Explorar Ingredientes" showSearchIcon={ false } />
      <IngredientsList />
      <Footer />
    </div>
  );
}

export default ExploreByIngredients;
