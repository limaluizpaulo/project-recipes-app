import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';
import {
  getMealsRecipes,
  // getMealsCategories,
  // getMealsIngredients,
  getMealsIngredientsFilter,
  getMealsNameFilter,
  getMealsFirstLetterFilter,
} from '../helpers/MealsAPI';

function MealsProvider({ children }) {
  const [meals, setMeals] = useState([]);
  // const [mealsCategories, setMealsCategories] = useState([]);
  // const [mealsIngredients, setMealsIngredients] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filterHeader, setFilterHeader] = useState({});

  const maxCards = 12;

  useEffect(() => {
    const recipes = async () => {
      setIsFetching(true);
      const results = await getMealsRecipes();
      setMeals(results.filter((item, index) => index < maxCards)); //  refatorar
      setIsFetching(false);
    };

    // const categories = async () => {
    //   setIsFetching(true);
    //   const results = await getMealsCategories();
    //   setMeals(results);
    //   setIsFetching(false);
    // };

    // const ingredients = async () => {
    //   setIsFetching(true);
    //   const results = await getMealsIngredients();
    //   setMeals(results.filter((item, index) => index < maxCards));
    //   setIsFetching(false);
    // };

    recipes();
    // categories();
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
    setMeals(filterHeader);
  }, [filterHeader]);

  const context = {
    // mealsCategories,
    isFetching,
    // mealsIngredients,
    meals,
    setFilterHeader,
  };
  return (
    <MealsContext.Provider value={ context }>
      {children}
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MealsProvider;
