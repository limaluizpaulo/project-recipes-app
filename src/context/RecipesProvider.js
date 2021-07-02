/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

import {
  fetchAllRecipes,
  fetchRecipesBySearch,
  fetchRandomRecipe,
  fetchRecipesByArea,
} from '../services/RecipesAPI';

function RecipesProvider({ children }) {
  const [user, setUser] = useState('');
  const [mealsOrDrinks, setMealsOrDrinks] = useState('meals');
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(false);
  const [redirectToRecipeDetails, setRedirectToRecipeDetails] = useState(false);
  const [redirectToMainScreen, setRedirectToMainScreen] = useState(false);

  const location = useLocation();

  const login = (email) => {
    setUser(email);
  };

  const getInitialRecipes = async () => {
    const allRecipes = await fetchAllRecipes(mealsOrDrinks);
    setRecipes(allRecipes.meals);
  };

  const searchRecipesBy = async ({ searchParameter, searchPayload }) => {
    const recipesBySearch = await fetchRecipesBySearch(
      mealsOrDrinks, searchParameter, searchPayload,
    );
    setRecipes(recipesBySearch[mealsOrDrinks]);
  };

  const getRandomRecipe = async () => {
    const recipe = await fetchRandomRecipe(mealsOrDrinks);
    setRecipeDetails(recipe[mealsOrDrinks][0]);
    setRedirectToRecipeDetails(true);
  };

  const filterByIngredients = (searchPayload) => {
    searchRecipesBy({ searchParameter: 'ingredient', searchPayload });
    console.log(`filtro ${searchPayload}`);
    setRedirectToMainScreen(true);
  };

  const filterByArea = async ({ target: { value } }) => {
    if (value === 'All') {
      getInitialRecipes();
    } else {
      const { meals } = await fetchRecipesByArea(value);
      setRecipes(meals);
    }
  };

  const lookDetailsRecipe = (recipe) => {
    setRecipeDetails(recipe);
    setRedirectToRecipeDetails(true);
  };

  const context = {
    mealsOrDrinks,
    user,
    login,
    recipes,
    searchRecipesBy,
    recipeDetails,
    redirectToRecipeDetails,
    getRandomRecipe,
    redirectToMainScreen,
    setRedirectToMainScreen,
    setRedirectToRecipeDetails,
    filterByIngredients,
    filterByArea,
    lookDetailsRecipe,
    getInitialRecipes,
  };

  useEffect(() => {
    getInitialRecipes();
  }, []);

  useEffect(() => {
    if (location.pathname.includes('comida')) {
      setMealsOrDrinks('meals');
    } else if (location.pathname.includes('bebida')) {
      setMealsOrDrinks('drinks');
    }
  }, [location]);

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
