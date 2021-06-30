import React, { useContext } from 'react';
import RecipeContext from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesMealList from '../components/RecipesMealList';

import SearchBar from '../components/SearchBar';

function Food() {
  const { showSearch, categories, setSelectedCategory } = useContext(RecipeContext);

  return (
    <div>
      <Header title="Comidas" />
      {categories.map(({ strCategory }) => (
        <button
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          key={ strCategory }
          onClick={ () => setSelectedCategory(strCategory) }
        >
          { strCategory }
        </button>
      ))}
      { showSearch && <SearchBar /> }
      <RecipesMealList />
      <Footer />
    </div>
  );
}

export default Food;
