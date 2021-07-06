import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import {
  fetchMealsApi,
  fetchMealsById,
  fetchMealsRecomendation,
} from '../apis/MealsApis';
import {
  fetchCocktailsApi,
  fetchDrinksById,
  fetchCocktailsRecomendation,
} from '../apis/CocktailsApis';

export default function Provider({ children }) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [cocktailsRecipes, setCocktailsRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState({});

  const handleSearchBar = () => {
    setOpenSearchBar(!openSearchBar);
  };

  const findCocktailsByFilter = async (filter) => {
    const apiCocktails = await fetchCocktailsApi(filter);
    setCocktailsRecipes(apiCocktails);
  };

  const resquestCocktailsApi = async () => {
    const apiCocktails = await fetchCocktailsRecomendation();
    setCocktailsRecipes(apiCocktails);
  };

  const findMealsByFilter = async (filter) => {
    const apiMeals = await fetchMealsApi(filter);
    setMealsRecipes(apiMeals);
  };

  const resquestMealsApi = async () => {
    const apiMeals = await fetchMealsRecomendation();
    setMealsRecipes(apiMeals);
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

  // Busca uma bebida ou comida através do ID
  const storeCurrentRecipe = async (id) => {
    const mealById = await fetchMealsById(id);
    const drinkById = await fetchDrinksById(id);

    // Verifica se é uma comida válida
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
        title: strMeal,
        subtitle: strCategory,
        ingredients: populateIngredientsArray(mealById[0]),
        instructions: strInstructions,
        thumb: strMealThumb,
        video: strYoutube,
        area: strArea,
        type: 'comida',
      };

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

      // Constrói o objeto de bebida
      const drink = {
        id: idDrink,
        title: strDrink,
        subtitle: strAlcoholic,
        ingredients: populateIngredientsArray(drinkById[0]),
        instructions: strInstructions,
        thumb: strDrinkThumb,
        area: strArea,
        type: 'bebida',
        category: strCategory,
      };

      setCurrentRecipe(drink);
    }
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
