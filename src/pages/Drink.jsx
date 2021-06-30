import React, { useContext } from 'react';
import RecipeContext from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipesDrinkList from '../components/RecipesDrinksList';

function Drink() {
  const { showSearch, categories, setSelectedCategory } = useContext(RecipeContext);

  return (
    <div>
      <Header title="Bebidas" />
      { showSearch && <SearchBar /> }
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
      <RecipesDrinkList />
      <Footer />
    </div>
  );
}

export default Drink;
