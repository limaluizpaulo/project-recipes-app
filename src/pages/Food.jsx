import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context';

import SearchBar from '../components/SearchBar';

function Food() {
  const { showSearch } = useContext(RecipeContext);

  return (
    <div>
      <Header title="Comidas" />
      { showSearch && <SearchBar /> }
      <Footer />
    </div>
  );
}

export default Food;
