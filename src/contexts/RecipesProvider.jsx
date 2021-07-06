/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import { getMealsRecipes } from '../helpers/MealsAPI';
import {
  getCocktailsRecipes,
} from '../helpers/CocktailsAPI';

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [type, setType] = useState('meals');
  // const [mealsIngredients, setMealsIngredients] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const maxCards = 12;

  const mustUpdateType = (strType, strPath, pathname) => (
    type !== strType && pathname.includes(strPath)
  );

  const { pathname } = useLocation();
  if (mustUpdateType('meals', 'comidas', pathname)) {
    setType('meals');
  }
  if (mustUpdateType('drinks', 'bebidas', pathname)) {
    setType('drinks');
  }

  useEffect(() => {
    setIsFetching(true);
    const recipes = async () => {
      const results = (type === 'meals')
        ? await getMealsRecipes() : await getCocktailsRecipes();
      /*
      results.reduce((acc, item) => {
        if (acc.length < maxCards) {
          acc.push(item);
        }
        return acc;
      }, []); */
      setData(results.filter((item, index) => index < maxCards)); //  refatorar para stopar ao atingir o maxCards
      setIsFetching(false);
    };

    // const ingredients = async () => {
    //   setIsFetching(true);
    //   const results = await getMealsIngredients();
    //   setMeals(results.filter((item, index) => index < maxCards));
    //   setIsFetching(false);
    // };

    recipes();
    // ingredients();
  }, [type]);

  const context = {
    // mealsCategories,
    isFetching,
    // mealsIngredients,
    data,
    type,
    setType,
    setIsFetching,
    setData,
    maxCards,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
