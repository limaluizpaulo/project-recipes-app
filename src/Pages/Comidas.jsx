import React, { useContext } from 'react';
import Context from '../context/Context';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MealList from '../components/MealList';

export default function Comidas() {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      <Header title="Comidas" searchIcon />
      { openSearchBar ? <SearchBar /> : null }
      <MealList />
    </div>
  );
}
