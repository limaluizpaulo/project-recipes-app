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

  async function filterRecipesByName(ingredient) {
    const recipesFilteredByIngredient = await fetchRecipesByName(ingredient);
    setFilteredRecipes({ filteredRecipes: recipesFilteredByIngredient });
  }

  async function filterRecipesByFirstLetter(ingredient) {
    const recipesFilteredByIngredient = await fetchRecipesByFirstLetter(ingredient);
    setFilteredRecipes({ filteredRecipes: recipesFilteredByIngredient });
  }

  return (
    <RecipesContext.Provider
      value={ {
        filterRecipesByIngredient, filterRecipesByName, filterRecipesByFirstLetter } }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
