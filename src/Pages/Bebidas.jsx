import React, { useContext } from 'react';
import Context from '../context/Context';

import Header from '../components/Header';
import SearchBarCocktail from '../components/SearchBarCocktail';
import CocktailList from '../components/CocktailList';

export default function Bebidas() {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      <Header title="Bebidas" searchIcon />
      { openSearchBar ? <SearchBarCocktail /> : null }
      <CocktailList />
    </div>
  );
}
