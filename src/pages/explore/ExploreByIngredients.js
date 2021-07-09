import React from 'react';

import Header from '../../components/Header';
import IngredientsList from '../../components/IngredientsList';
import Footer from '../../components/Footer';

function ExploreByIngredients() {
  return (
    <main>
      <Header title="Explore by Ingredients" showSearchIcon={ false } />
      <IngredientsList />
      <Footer />
    </main>
  );
}

export default ExploreByIngredients;
