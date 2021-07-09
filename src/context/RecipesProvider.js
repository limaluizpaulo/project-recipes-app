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
  const [startedRecipes, setStartedRecipes] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
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

  const localstorageSaveInProgressRecipe = (RecipeIngredients, type, id) => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const RECIPE = (type === 'meal') ? 'meals' : 'cocktails';
    inProgress[RECIPE][id] = RecipeIngredients;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  };

  const localstorageSaveStartedRecipe = (recipe, RecipeIngredients = []) => {
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

    localstorageSaveInProgressRecipe(RecipeIngredients, recipeObj.type, recipeObj.id);
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

  const organizeIngredients = (recipe) => {
    const MAX_INGREDIENTS = 20; // 20, because the max of meals usage is 20 and drinks is 15.
    let tempArray = [];
    for (let number = 1; number <= MAX_INGREDIENTS; number += 1) {
      if (recipe[`strIngredient${number}`]) {
        tempArray = [...tempArray, [
          recipe[`strIngredient${number}`],
          recipe[`strMeasure${number}`],
        ]];
      }
    }
    setIngredients(tempArray);
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
    startedRecipes,
    favoritedRecipes,
    localstorageSaveStartedRecipe,
    localstorageSaveFavoriteRecipe,
    organizeIngredients,
    ingredients,
    filtredByIngredients,
    setFiltredByIngredients,
    recipesCategory,
    setRecipesCategory,
    searchByCategory,
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
