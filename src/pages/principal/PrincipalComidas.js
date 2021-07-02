import React from 'react';

import Header from '../../components/Header';
import CategoryButtons from '../../components/CategoryButtons';
import RecipesList from '../../components/RecipesList';
import Footer from '../../components/Footer';

function PrincipalComidas() {
  return (
    <main>
      <Header title="Comidas" />
      <CategoryButtons />
      <RecipesList />
      <Footer />
    </main>
  );
}

export default PrincipalComidas;
