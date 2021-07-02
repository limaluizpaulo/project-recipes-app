import React from 'react';

import Header from '../../components/Header';
import CategoryButtons from '../../components/CategoryButtons';
import RecipesList from '../../components/RecipesList';
import Footer from '../../components/Footer';

function PrincipalBebidas() {
  return (
    <main>
      <Header title="Bebidas" />
      <CategoryButtons />
      <RecipesList />
      <Footer />
    </main>
  );
}

export default PrincipalBebidas;
