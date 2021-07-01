import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import { fetchRecipesByIngredient, fetchRecipesByName,
  fetchRecipesByFirstLetter, fetchAllRecipes } from '../services/RecipesServices';

function RecipesProvider({ children }) {
  const [recipesFilter, setRecipesFilter] = useState({ filteredRecipes: [] });
  const [allRecipes, setAllRecipes] = useState({ recipes: [] });

  async function filterRecipesByIngredient(ingredient) {
    const recipesFilteredByIngredient = await fetchRecipesByIngredient(ingredient);
    setRecipesFilter({ filteredRecipes: recipesFilteredByIngredient });
  }

  async function filterRecipesByName(name) {
    const recipesFilteredByName = await fetchRecipesByName(name);
    setRecipesFilter({ filteredRecipes: recipesFilteredByName });
  }

  async function filterRecipesByFirstLetter(firstLetter) {
    const recipesFilteredByFirstLetter = await fetchRecipesByFirstLetter(firstLetter);
    setRecipesFilter({ filteredRecipes: recipesFilteredByFirstLetter });
  }

  async function getAllRecipes() {
    const recipes = await fetchAllRecipes();
    setAllRecipes({ recipes });
  }

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <RecipesContext.Provider
      value={ { recipesFilter,
        filterRecipesByIngredient,
        filterRecipesByName,
        filterRecipesByFirstLetter,
        allRecipes,
        getAllRecipes } }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
