import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import { getMealsRecipes, getRecipesByIng } from '../helpers/MealsAPI';
import {
  getCocktailsRecipes,
} from '../helpers/CocktailsAPI';

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [type, setType] = useState('meals');
  const [isFetching, setIsFetching] = useState(true);
  const [ingredient, setIngredient] = useState('');

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
      setData(results.filter((item, index) => index < maxCards)); //  refatorar para stopar ao atingir o maxCards
      setIsFetching(false);
    };

    const fetchRecipesByIngredient = async () => {
      setIsFetching(true);
      const recipesIngredients = await getRecipesByIng(ingredient, type);
      setData(recipesIngredients);
      setIsFetching(false);
    };

    if (ingredient === '') {
      recipes();
    } else {
      fetchRecipesByIngredient();
    }
  }, [ingredient, type]);

  const context = {
    isFetching,
    data,
    type,
    setType,
    setIsFetching,
    setData,
    maxCards,
    ingredient,
    setIngredient,
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
