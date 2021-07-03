import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import {
  fetchRecipesByIngredient, fetchRecipesByName, fetchRecipesByFirstLetter,
  fetchAllRecipes, fetchCategoriesRecipes, fetchRecipesByCategory, fetchRecipesById,
} from '../services/RecipesServices';

function RecipesProvider({ children }) {
  const [recipesFilter, setRecipesFilter] = useState({ filteredRecipes: [] });
  const [allRecipes, setAllRecipes] = useState({ recipes: [] });
  const [allCategories, setAllCategories] = useState({ categories: [] });
  const [recipesFilteredByCategory,
    setRecipesFilteredByCategory] = useState({ recipesByCategory: [] });
  const [category, setCategory] = useState('All');
  const [isFiltred, setIsFiltred] = useState(false);
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [ingredientsRecipe, setIngredientsRecipe] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState([]);

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

  async function getAllCategories() {
    const categories = await fetchCategoriesRecipes();
    setAllCategories({ categories });
  }

  async function filterRecipesByCategory(categoryRecipe) {
    const recipesByCategory = await fetchRecipesByCategory(categoryRecipe);
    setRecipesFilteredByCategory({ recipesByCategory });
  }

  async function getRecipesById(id) {
    const SIZE = -1;
    const recipe = await fetchRecipesById(id);
    setRecipeDetail(recipe[0]);
    const keys = [];
    Object.keys(recipeDetail).forEach((key) => {
      if (key.indexOf('strIngredient') > SIZE && recipeDetail[key] !== '') {
        keys.push(recipeDetail[key]);
      }
    });
    setIngredientsRecipe(keys);
    keys.slice(0, keys.length);
  }
  useEffect(() => {
    getAllRecipes();
    getAllCategories();
    filterRecipesByCategory(category);
  }, [category]);

  return (
    <RecipesContext.Provider
      value={ { recipesFilter,
        filterRecipesByIngredient,
        filterRecipesByName,
        filterRecipesByFirstLetter,
        allRecipes,
        allCategories,
        filterRecipesByCategory,
        recipesFilteredByCategory,
        setCategory,
        category,
        isFiltred,
        setIsFiltred,
        recipeDetail,
        getRecipesById,
        ingredientsRecipe,
        randomRecipe,
        setRandomRecipe,
      } }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
