import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { fetchMealApi, fetchMealRecomendation } from '../apis/MealsApis';
import { fetchCocktailsApi, fetchCocktailsRecomendation } from '../apis/CocktailsApis';

export default function Provider({ children }) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [cocktailsRecipes, setCocktailsRecipes] = useState([]);

  const handleSearchBar = () => {
    setOpenSearchBar(!openSearchBar);
  };

  const findByFilter = async (filter) => {
    const apiMeals = await fetchMealApi(filter);
    setMealsRecipes(apiMeals);
  };

  const resquestApi = async () => {
    const apiMeals = await fetchMealRecomendation();
    setMealsRecipes(apiMeals);
  };

  const findByFilterCocktails = async (filter) => {
    const apiCocktails = await fetchCocktailsApi(filter);
    setCocktailsRecipes(apiCocktails);
  };

  const resquestApiCocktails = async () => {
    const apiCocktails = await fetchCocktailsRecomendation();
    setCocktailsRecipes(apiCocktails);
  };

  useEffect(() => {
    resquestApi();
    resquestApiCocktails();
  }, []);

  const context = {
    openSearchBar,
    handleSearchBar,
    findByFilter,
    mealsRecipes,
    cocktailsRecipes,
    findByFilterCocktails,
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
