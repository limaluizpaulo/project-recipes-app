import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { fetchMealsApi, fetchMealsById, fetchMealsRecomendation } from '../apis/MealsApis';
import { fetchCocktailsApi, fetchDrinksById, fetchCocktailsRecomendation } from '../apis/CocktailsApis';

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

  useEffect(() => {
    resquestCocktailsApi();
    resquestMealsApi();
  }, []);

  // Busca uma bebida ou comida através do ID
  const storeCurrentRecipe = async (id) => {
    const mealById = await fetchMealsById(id);
    const drinkById = await fetchDrinksById(id);
    const ingredients = [];

    // Verifica se é uma comida válida
    if (mealById) {
        const {
            idMeal,
            strMeal,
            strCategory,
            strInstructions,
            strMealThumb,
            strYoutube
          } = mealById[0];

        // Popula o array de ingredients
        for (let index = 1; index < 20; index +=1) {
          if(mealById[0]['strIngredient' + index]) {
            ingredients.push({
              ingredient: mealById[0]['strIngredient' + index],
              measure: mealById[0]['strMeasure' + index],
            });
          }
        }
      
        // Constrói o obejeto de comias
        const meal = {
          id: idMeal,
          title: strMeal,
          subtitle: strCategory,
          ingredients,
          instructions: strInstructions,
          thumb: strMealThumb,
          video: strYoutube,
        }

        setCurrentRecipe(meal);
      }

      // Verifica se é uma bebida válida
      if (drinkById) {
        const {
          idDrink,
          strDrink,
          strAlcoholic,
          strInstructions,
          strDrinkThumb
        } = drinkById[0];

        // Popula o array de ingredientes
        for (let index = 1; index < 20; index +=1) {
          if(drinkById[0]['strIngredient' + index]) {
            ingredients.push({
              ingredient: drinkById[0]['strIngredient' + index],
              measure: drinkById[0]['strMeasure' + index],
            });
          }
        }

        // Constrói o objeto de bebida
        const drink = {
          id: idDrink,
          title: strDrink,
          subtitle: strAlcoholic,
          ingredients,
          instructions: strInstructions,
          thumb: strDrinkThumb,
        };

        setCurrentRecipe(drink);
    }
  }

  const context = {
    openSearchBar,
    handleSearchBar,
    findMealsByFilter,
    mealsRecipes,
    findCocktailsByFilter,
    cocktailsRecipes,
    storeCurrentRecipe,
    currentRecipe,
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
