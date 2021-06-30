import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import { fetchRecipesByIngredient,
  fetchRecipesByName, fetchRecipesByFirstLetter } from '../services/RecipesServices';

function RecipesProvider({ children }) {
  const [filteredRecipes, setFilteredRecipes] = useState({ filteredRecipes: [] });

  async function filterRecipesByIngredient(ingredient) {
    const recipesFilteredByIngredient = await fetchRecipesByIngredient(ingredient);
    setFilteredRecipes({ filteredRecipes: recipesFilteredByIngredient });
  }

  async function filterRecipesByName(name) {
    const recipesFilteredByName = await fetchRecipesByName(name);
    setFilteredRecipes({ filteredRecipes: recipesFilteredByName });
  }

  async function filterRecipesByFirstLetter(firstLetter) {
    const recipesFilteredByFirstLetter = await fetchRecipesByFirstLetter(firstLetter);
    setFilteredRecipes({ filteredRecipes: recipesFilteredByFirstLetter });
  }

  return (
    <RecipesContext.Provider
      value={ { filteredRecipes,
        filterRecipesByIngredient,
        filterRecipesByName,
        filterRecipesByFirstLetter } }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
