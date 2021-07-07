import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import {
  fetchMealsApi,
  fetchMealsByCategory,
  fetchMealsById,
  fetchMealsCategories,
  fetchMealsRecomendation,
} from '../apis/MealsApis';
import {
  fetchCocktailsApi,
  fetchDrinksById,
  fetchCocktailsCategories,
  fetchCocktailsRecomendation,
  fetchCocktailsByCategory,
} from '../apis/CocktailsApis';

export default function Provider({ children }) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [cocktailsRecipes, setCocktailsRecipes] = useState([]);
  const [cocktailsCategories, setCocktailsCategories] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [curr, setCurr] = useState('false');

  // boolean: searchBar appears or not
  const handleSearchBar = () => {
    setOpenSearchBar(!openSearchBar);
  };

  // update state of cocktails categories
  const requestCocktailsCategories = async () => {
    const cocktailsCat = await fetchCocktailsCategories();
    setCocktailsCategories(cocktailsCat);
  };

  // update array of cocktails based on the searchBar filter
  const findCocktailsByFilter = async (filter) => {
    const apiCocktails = await fetchCocktailsApi(filter);
    setSelectedCategory('All');
    setCocktailsRecipes(apiCocktails);
  };

  // update array of cocktails with all cocktails
  const resquestCocktailsApi = async () => {
    const apiCocktails = await fetchCocktailsRecomendation();
    setCocktailsRecipes(apiCocktails);
  };

  // update state of meals categories
  const requestMealCategories = async () => {
    const mealsCat = await fetchMealsCategories();
    setMealsCategories(mealsCat);
  };

  // update array of meals based on the searchBar filter
  const findMealsByFilter = async (filter) => {
    const apiMeals = await fetchMealsApi(filter);
    setSelectedCategory('All');
    setMealsRecipes(apiMeals);
  };

  // update array of meals with all meals
  const resquestMealsApi = async () => {
    const apiMeals = await fetchMealsRecomendation();
    setMealsRecipes(apiMeals);
  };

  // ---------- Filter By Category

  // update array of cocktails based on the category filter
  const findCocktailsByCategory = async () => {
    const apiCocktails = await fetchCocktailsByCategory(selectedCategory);
    setCocktailsRecipes(apiCocktails);
  };

  // update array of meals based on the category filter
  const findMealsByCategory = async () => {
    const apiMeals = await fetchMealsByCategory(selectedCategory);
    setMealsRecipes(apiMeals);
  };

  // check if the page is for meals or cocktails
  const filterByCategory = async (type) => {
    if (selectedCategory === 'All') {
      if (type === 'meals') {
        resquestMealsApi();
      }
      if (type === 'drinks') {
        resquestCocktailsApi();
      }
    } else {
      if (type === 'meals') {
        findMealsByCategory();
      }
      if (type === 'drinks') {
        findCocktailsByCategory();
      }
    }
  };

  // Popula o array de ingredients
  const populateIngredientsArray = (recipe) => {
    const ingredients = [];
    const API_MAX_INGREDIENTS = 20;

    for (let index = 1; index < API_MAX_INGREDIENTS; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        ingredients.push({
          ingredient: recipe[`strIngredient${index}`],
          measure: recipe[`strMeasure${index}`],
        });
      }
    }

    return ingredients;
  };

  // Trata se deve gerar um estado com uma comida ou bebida
  const generateMealOrDrinkState = (mealById, drinkById) => {
    if (mealById) {
      const {
        idMeal,
        strMeal,
        strCategory,
        strInstructions,
        strMealThumb,
        strYoutube,
        strArea,
      } = mealById[0];
      // Constrói o obejeto de comias
      const meal = {
        id: idMeal,
        name: strMeal,
        category: strCategory,
        ingredients: populateIngredientsArray(mealById[0]),
        instructions: strInstructions,
        image: strMealThumb,
        video: strYoutube,
        area: strArea,
        type: 'comida',
      };
      setCurr('meals');
      setCurrentRecipe(meal);
    }
    // Verifica se é uma bebida válida
    if (drinkById) {
      const {
        idDrink,
        strDrink,
        strAlcoholic,
        strInstructions,
        strDrinkThumb,
        strArea,
        strCategory,
      } = drinkById[0];
      const drink = {
        id: idDrink,
        name: strDrink,
        alcoholicOrNot: strAlcoholic,
        ingredients: populateIngredientsArray(drinkById[0]),
        instructions: strInstructions,
        image: strDrinkThumb,
        area: strArea,
        type: 'bebida',
        category: strCategory,
      };
      setCurr('cocktails');
      setCurrentRecipe(drink);
    }
  };

  // Busca uma bebida ou comida através do ID
  const storeCurrentRecipe = async (id) => {
    const mealById = await fetchMealsById(id);
    const drinkById = await fetchDrinksById(id);

    generateMealOrDrinkState(mealById, drinkById);
  };

  const context = {
    openSearchBar,
    handleSearchBar,
    findMealsByFilter,
    mealsRecipes,
    findCocktailsByFilter,
    cocktailsRecipes,
    storeCurrentRecipe,
    currentRecipe,
    resquestCocktailsApi,
    resquestMealsApi,
<<<<<<< HEAD
    curr,
=======
    requestMealCategories,
    mealsCategories,
    requestCocktailsCategories,
    cocktailsCategories,
    selectedCategory,
    setSelectedCategory,
    filterByCategory,
>>>>>>> 8850565f740404e47d1e54de2355c2d3c7d428e0
  };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
