import React, { useContext } from 'react';
import RecipeContext from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesMealList from '../components/RecipesMealList';

import SearchBar from '../components/SearchBar';

function Food() {
  const { showSearch } = useContext(RecipeContext);

  return (
    <div>
      <Header title="Comidas" />
      { showSearch && <SearchBar /> }
      <RecipesMealList />
      <Footer />
    </div>
  );
}

export default Food;
