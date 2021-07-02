import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { fetchMealApi, fetchMealRecomendation } from '../apis/MealsApis';

export default function Provider({ children }) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [mealsRecipes, setMealsRecipes] = useState([]);

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

  useEffect(() => {
    resquestApi();
  }, []);

  const context = {
    openSearchBar,
    handleSearchBar,
    findByFilter,
    mealsRecipes,
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
