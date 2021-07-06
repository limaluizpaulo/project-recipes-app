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
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredientsFood, setIngredientsFood] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState([]);

  const [ingredients, setIngredients] = useState([]);

  const [isExplored, setIsExplored] = useState(false);

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
        foodDetails,
        fetchRecipesById,
        setFoodDetails,
        ingredientsFood,
        setIngredientsFood,
        randomRecipe,
        setRandomRecipe,
        ingredients,
        setIngredients,
        isExplored,
        setIsExplored,
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
