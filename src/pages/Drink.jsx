import React, { useContext } from 'react';
import RecipeContext from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipesDrinkList from '../components/RecipesDrinksList';

function Drink() {
  const { showSearch } = useContext(RecipeContext);

  return (
    <div>
      <Header title="Bebidas" />
      { showSearch && <SearchBar /> }
      <RecipesDrinkList />
      <Footer />
    </div>
  );
}

export default Drink;
