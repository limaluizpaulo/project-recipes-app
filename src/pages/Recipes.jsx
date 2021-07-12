import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import RecipeContext from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

import SearchBar from '../components/SearchBar';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';

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

  return (
    <div>
      <Header
        title={ `${SEARCH_GENERAL.includes('meal') ? 'Comidas' : 'Bebidas'}` }
        search
      />
      { showSearch && <SearchBar /> }
      <div className="d-flex flex-wrap justify-content-center">
        <Button
          style={ { width: '33%' } }
          size="sm"
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleClick('') }
        >
          All
        </Button>
        {categories.map(({ strCategory }) => (
          <Button
            style={ { width: '33%' } }
            size="sm"
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            key={ strCategory }
            onClick={ () => handleClick(strCategory) }
          >
            { strCategory }
          </Button>
        ))}
      </div>
      <RecipesList url={ SEARCH_GENERAL } />
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  urlRecipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Recipes;
