import React, { useContext } from 'react';
import ContextBebidas from '../context/ContextBebidas';

import Header from '../components/Header';
import SearchBarCocktail from '../components/SearchBarCocktail';
import CocktailList from '../components/CocktailList';

export default function Bebidas() {
  const { openSearchBarCocktail } = useContext(ContextBebidas);

  return (
    <div>
      <Header title="Bebidas" searchIcon />
      { openSearchBarCocktail ? <SearchBarCocktail /> : null }
      <CocktailList />
    </div>
  );
}
