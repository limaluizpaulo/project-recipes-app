import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

import SearchBar from '../components/SearchBar';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';

// const SEARCH_GENERAL_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const SEARCH_BY_CATEGORY_MEAL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

function Recipes({ urlRecipe: { SEARCH_GENERAL, SEARCH_BY_CATEGORY } }) {
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
      setRecipeUrl(SEARCH_GENERAL);
    } else {
      setToggleBtnCategories(true);
      setSelectedCategory(category);
      setRecipeUrl(`${SEARCH_BY_CATEGORY}${category}`);
    }
  }

  // function handleAll() {
  //   setToggleBtnCategories(false);
  //   setSelectedCategory('');
  //   setRecipeUrl(SEARCH_GENERAL_MEAL);
  // }

  return (
    <div>
      <Header
        title={ `${SEARCH_GENERAL.includes('meal') ? 'Comidas' : 'Bebidas'}` }
        search
      />
      { showSearch && <SearchBar /> }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClick('') }
        // onClick={ handleClick }
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
      <RecipesList url={ SEARCH_GENERAL } />
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  urlRecipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Recipes;
