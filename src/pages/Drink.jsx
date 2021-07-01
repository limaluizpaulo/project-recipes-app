import React, { useContext } from 'react';
import RecipeContext from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipesDrinkList from '../components/RecipesDrinksList';

function Drink() {
  const {
    showSearch,
    categories,
    setSelectedCategory,
    selectedCategory,
    setToggleBtnCategories,
  } = useContext(RecipeContext);

  function handleClick(category) {
    if (selectedCategory === category) {
      setToggleBtnCategories(false);
      setSelectedCategory('');
    } else {
      setToggleBtnCategories(true);
      setSelectedCategory(category);
    }
  }

  function handleAll() {
    setToggleBtnCategories(false);
    setSelectedCategory('');
  }

  return (
    <div>
      <Header title="Bebidas" />
      { showSearch && <SearchBar /> }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleAll() }
      >
        All
      </button>
      {categories.map(({ strCategory }) => (
        <button
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          key={ strCategory }
          onClick={ () => handleClick(strCategory) }
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
