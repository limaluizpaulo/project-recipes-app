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
} from '../services/recipesAPI';

function RecipesProvider({ children }) {
  const [user, setUser] = useState('');
  const [mealsOrDrinks, setMealsOrDrinks] = useState('meals');
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [redirectToMainScreen, setRedirectToMainScreen] = useState(false);
  const [redirectToRecipeDetails, setRedirectToRecipeDetails] = useState(false);
  const [startedRecipes, setStartedRecipes] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);

  const location = useLocation();

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

  const localstorageSaveInProgressRecipe = (ingredients, type, id) => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const RECIPE = (type === 'meal') ? 'meals' : 'cocktails';
    inProgress[RECIPE][id] = ingredients;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  };

  const localstorageSaveStartedRecipe = (recipe, ingredients = []) => {
    const recipeObj = {
      id: (recipe.idMeal) ? recipe.idMeal : recipe.idDrink,
      type: (recipe.idMeal) ? 'comida' : 'bebida',
      area: (recipe.strArea) ? recipe.strArea : '',
      category: (recipe.strCategory) ? recipe.strCategory : '',
      alcoholicOrNot: (recipe.strAlcoholic) ? recipe.strAlcoholic : '',
      name: (recipe.strMeal) ? recipe.strMeal : recipe.strDrink,
      image: (recipe.strMealThumb) ? recipe.strMealThumb : recipe.strDrinkThumb,
      doneDate: (recipe.dateModified) ? recipe.dateModified : '',
      tags: (recipe.strTags) ? recipe.strTags : [],
    };

    let arrayOfRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    arrayOfRecipes = [...arrayOfRecipes, recipeObj];
    setStartedRecipes(arrayOfRecipes);
    localStorage.setItem('doneRecipes', JSON.stringify(arrayOfRecipes));

    localstorageSaveInProgressRecipe(ingredients, recipeObj.type, recipeObj.id);
  };

  const localstorageSaveFavoriteRecipe = (recipe, isFav) => {
    const recipeObj = {
      id: (recipe.idMeal) ? recipe.idMeal : recipe.idDrink,
      type: (recipe.idMeal) ? 'comida' : 'bebida',
      area: (recipe.strArea) ? recipe.strArea : '',
      category: (recipe.strCategory) ? recipe.strCategory : '',
      alcoholicOrNot: (recipe.strAlcoholic) ? recipe.strAlcoholic : '',
      name: (recipe.strMeal) ? recipe.strMeal : recipe.strDrink,
      image: (recipe.strMealThumb) ? recipe.strMealThumb : recipe.strDrinkThumb,
    };
    let arrayOfRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (isFav) {
      arrayOfRecipes = [...arrayOfRecipes, recipeObj];
    }

    if (!isFav) {
      // SOURCE: https://stackoverflow.com/questions/10557486/in-an-array-of-objects-fastest-way-to-find-the-index-of-an-object-whose-attribu
      const foundByIndex = arrayOfRecipes
        .map((element) => element.id)
        .indexOf(recipeObj.id);
      const NEGATIVE = -1;
      if (foundByIndex !== NEGATIVE) arrayOfRecipes.splice(foundByIndex, 1);
    }
    setFavoritedRecipes(arrayOfRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayOfRecipes));
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
    startedRecipes,
    favoritedRecipes,
    localstorageSaveStartedRecipe,
    localstorageSaveFavoriteRecipe,
  };

  useEffect(() => {
    if (!(localStorage.getItem('doneRecipes'))) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    if (!(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    if (!(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    getInitialRecipes();
  }, []);

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
