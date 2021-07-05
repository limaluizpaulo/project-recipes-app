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
  const [type, setType] = useState('meal');
  // const [mealsCategories, setMealsCategories] = useState([]);
  // const [mealsIngredients, setMealsIngredients] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const maxCards = 12;

  const mustUpdateType = (strType, strPath, pathname) => (
    type !== strType && pathname.includes(strPath)
  );

  const { pathname } = useLocation();
  if (mustUpdateType('meal', 'comidas', pathname)) {
    setType('meal');
  }
  if (mustUpdateType('drink', 'bebidas', pathname)) {
    setType('drink');
  }

  useEffect(() => {
    const recipes = async () => {
      const results = (type === 'meal')
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
  }, []);

  const context = {
    // mealsCategories,
    isFetching,
    // mealsIngredients,
    data,
    type,
    setType,
    setIsFetching,
    setData,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {/* {console.log(pathname)} */}
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
