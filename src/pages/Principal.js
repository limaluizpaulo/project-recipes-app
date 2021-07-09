import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeResults from '../components/RecipeResults';
import CategoryOptions from '../components/CategoryOptions';

function Principal() {
  return (
    <div>
      <Header />
      <CategoryOptions />
      <RecipeResults />
      <Footer />
    </div>

  );
}

export default Principal;
