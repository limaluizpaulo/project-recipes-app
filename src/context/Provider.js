import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { fetchMealsApi, fetchMealsRecomendation } from '../apis/MealsApis';
import { fetchCocktailsApi, fetchCocktailsRecomendation } from '../apis/CocktailsApis';

export default function Provider({ children }) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [cocktailsRecipes, setCocktailsRecipes] = useState([]);

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

  const context = {
    openSearchBar,
    handleSearchBar,
    findMealsByFilter,
    mealsRecipes,
    findCocktailsByFilter,
    cocktailsRecipes,
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
