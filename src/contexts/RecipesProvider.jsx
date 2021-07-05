/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import {
  getMealsRecipes,
  // getMealsIngredients,
  getMealsIngredientsFilter,
  getMealsNameFilter,
  getMealsFirstLetterFilter,
  getMealsCategories,
} from '../helpers/MealsAPI';
import {
  getCocktailsCategories,
  getCocktailsRecipes,
} from '../helpers/CocktailsAPI';

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [type, setType] = useState('meal');
  const [categoriesData, setCategoriesData] = useState([]);
  // const [mealsCategories, setMealsCategories] = useState([]);
  // const [mealsIngredients, setMealsIngredients] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filterHeader, setFilterHeader] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toggle, setToggle] = useState(false);

  const maxCards = 12;
  const maxCategories = 5;

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
      setIsFetching(true);
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

    const categories = async () => {
      setIsFetching(true);
      const results = (type === 'meal')
        ? await getMealsCategories() : await getCocktailsCategories();
      setCategoriesData(results.filter((item, index) => index < maxCategories));
      // const results = await getMealsCategories();
      // setMeals(results);
      setIsFetching(false);
    };

    // const ingredients = async () => {
    //   setIsFetching(true);
    //   const results = await getMealsIngredients();
    //   setMeals(results.filter((item, index) => index < maxCards));
    //   setIsFetching(false);
    // };

    recipes();
    categories();
    // ingredients();
  }, []);

  useEffect(() => {
    const filterApi = () => {
      if (filterHeader.radioInput === 'ingredients') {
        getMealsIngredientsFilter(filterHeader.searchInput);
      }
      if (filterHeader.radioInput === 'name') {
        getMealsNameFilter(filterHeader.searchInput);
      }
      if (filterHeader.radioInput === 'firstLetter') {
        getMealsFirstLetterFilter(filterHeader.searchInput);
      }
    };
    filterApi();
    setData(filterHeader);
  }, [filterHeader]);

  const context = {
    // mealsCategories,
    isFetching,
    // mealsIngredients,
    data,
    type,
    setType,
    setFilterHeader,
    categoriesData,
    selectedCategory,
    setSelectedCategory,
    setToggle,
    toggle,
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
