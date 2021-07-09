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
  fetchRecipesByCategory,
} from '../services/recipesAPI';

function RecipesProvider({ children }) {
  const [user, setUser] = useState('');
  const [mealsOrDrinks, setMealsOrDrinks] = useState('meals');
  const [recipes, setRecipes] = useState([]);
  const [recipesCategory, setRecipesCategory] = useState('All');
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [redirectToMainScreen, setRedirectToMainScreen] = useState(false);
  const [redirectToRecipeDetails, setRedirectToRecipeDetails] = useState(false);
  const [filtredByIngredients, setFiltredByIngredients] = useState(false);

  const location = useLocation();

  const getInitialRecipes = async (mealsDrinks) => {
    const allRecipes = await fetchAllRecipes(mealsDrinks);
    setRecipes(allRecipes[mealsDrinks]);
  };

  const searchRecipesBy = async ({ drinksOrMeals, searchParameter, searchPayload }) => {
    const recipesBySearch = await fetchRecipesBySearch(
      drinksOrMeals, searchParameter, searchPayload,
    );
    setRecipes(recipesBySearch[drinksOrMeals]);
  };

  const getRandomRecipe = async () => {
    const recipe = await fetchRandomRecipe(mealsOrDrinks);
    setRecipeDetails(recipe[mealsOrDrinks][0]);
    setRedirectToRecipeDetails(true);
  };

  const filterByIngredients = async (drinksOrMeals, searchPayload) => {
    searchRecipesBy(
      { drinksOrMeals, searchParameter: 'ingredient', searchPayload },
    );
    setFiltredByIngredients(true);
    setRedirectToMainScreen(true);
  };

  const filterByArea = async ({ target: { value } }) => {
    if (value === 'All') {
      getInitialRecipes('meals');
    } else {
      const { meals } = await fetchRecipesByArea(value);
      setRecipes(meals);
    }
  };

  const lookDetailsRecipe = (recipe) => {
    setRecipeDetails(recipe);
    setRedirectToRecipeDetails(true);
  };

  const searchByCategory = async (drinksOrMeals) => {
    if (recipesCategory !== 'All') {
      const request = await fetchRecipesByCategory(drinksOrMeals, recipesCategory);
      const recipesByCategory = request[drinksOrMeals];
      setRecipes(recipesByCategory);
    } else {
      getInitialRecipes(drinksOrMeals);
    }
  };

  const context = {
    mealsOrDrinks,
    user,
    setUser,
    recipes,
    searchRecipesBy,
    recipeDetails,
    redirectToRecipeDetails,
    redirectToMainScreen,
    setRedirectToMainScreen,
    getRandomRecipe,
    setRedirectToRecipeDetails,
    filterByIngredients,
    filterByArea,
    lookDetailsRecipe,
    getInitialRecipes,
    searchByCategory,
    filtredByIngredients,
    setFiltredByIngredients,
    recipesCategory,
    setRecipesCategory,
  };

  useEffect(() => {
    if (location.pathname.includes('comidas')) {
      setMealsOrDrinks('meals');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes('bebidas')) {
      setMealsOrDrinks('drinks');
    }
  }, [location.pathname]);

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
