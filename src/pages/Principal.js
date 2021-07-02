import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import CategoryButtons from '../../components/CategoryButtons';
import RecipesList from '../../components/RecipesList';
import Footer from '../../components/Footer';

function PrincipalBebidas() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const isDrinks = pathname.includes('bebidas');
  const title = isDrinks ? 'Bebidas' : 'Comidas';

  return (
    <main>
      <Header title={ title } />
      <CategoryButtons />
      <RecipesList />
      <Footer />
    </main>
  );
}

export default PrincipalBebidas;
