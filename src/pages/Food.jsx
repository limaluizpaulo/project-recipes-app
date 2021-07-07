import React, { useContext } from 'react';
import RecipeContext from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesMealList from '../components/RecipesMealList';

import SearchBar from '../components/SearchBar';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';

const SEARCH_GENERAL_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const SEARCH_BY_CATEGORY_MEAL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

function Food() {
  const [setRecipeUrl] = useFetchRecipesApi();
  const {
    showSearch,
    categories,
    setSelectedCategory,
    selectedCategory,
    setToggleBtnCategories,
  } = useContext(RecipeContext);

  function handleClick(category = '') {
    if (selectedCategory === category || category === '') {
      setToggleBtnCategories(false);
      setSelectedCategory('');
      setRecipeUrl(SEARCH_GENERAL_MEAL);
    } else {
      setToggleBtnCategories(true);
      setSelectedCategory(category);
      setRecipeUrl(`${SEARCH_BY_CATEGORY_MEAL}${category}`);
    }
  }

  // function handleAll() {
  //   setToggleBtnCategories(false);
  //   setSelectedCategory('');
  //   setRecipeUrl(SEARCH_GENERAL_MEAL);
  // }

  return (
    <div>
      <Header title="Comidas" />
      { showSearch && <SearchBar /> }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClick }
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
      <RecipesMealList url={ SEARCH_GENERAL_MEAL } />
      <Footer />
    </div>
  );
}

export default Food;
