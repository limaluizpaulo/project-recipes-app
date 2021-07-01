/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

import {
  fetchAllRecipes,
  fetchRecipesBySearch,
  fetchRandomRecipe,
} from '../services/RecipesAPI';

function RecipesProvider({ children }) {
  const [user, setUser] = useState('');
  const [mealsOrDrinks, setMealsOrDrinks] = useState('meals');
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(false);
  const [redirectToRecipeDetails, setRedirectToRecipeDetails] = useState(false);

  const login = (email) => {
    setUser(email);
  };

  const getInitialRecipes = async () => {
    const allRecipes = await fetchAllRecipes(mealsOrDrinks);
    setRecipes(allRecipes.meals);
  };

  const searchRecipesBy = async () => {
    const recipesBySearch = await fetchRecipesBySearch(
      mealsOrDrinks, 'ingredient', 'Chiken',
    );
    console.log(recipesBySearch);
  };

  const getRandomRecipe = async () => {
    const recipe = await fetchRandomRecipe(mealsOrDrinks);
    setRecipeDetails(recipe[mealsOrDrinks][0]);
    setRedirectToRecipeDetails(true);
  };

  const context = {
    user,
    login,
    recipes,
    searchRecipesBy,
    recipeDetails,
    redirectToRecipeDetails,
    getRandomRecipe,
  };

  useEffect(() => {
    getInitialRecipes();
  }, []);

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
