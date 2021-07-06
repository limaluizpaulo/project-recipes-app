import React, { useContext } from 'react';
import Header from './Header';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';

function FoodPage() {
  const { goSearch } = useContext(ContextRecipes);
  return (
    <div>
      <Header />
      { goSearch && <SBElements /> }

    </div>
  );
}

export default FoodPage;
