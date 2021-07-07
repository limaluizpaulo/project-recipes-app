import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchRecipes from '../services/api/fetchRecipes';
import fetchCategories from '../services/api/fetchCategories';
import fetchById from '../services/api/fetchById';
import fetchFilteredByCategory from '../services/api/fetchFilteredByCategory';

const MealsContext = createContext();

const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadMeals = async () => {
      const a = await fetchRecipes('meals');
      const b = await fetchCategories('meals');
      setMeals(a);
      setCategories(b);
    };
    loadMeals();
  }, []);

  const setFilterCategory = async ({ target: { id } }) => {
    let filtered;

    if (selectedCategory === id || id === 'All') {
      filtered = await fetchRecipes('meals');
      setSelectedCategory('All');
    } else {
      filtered = await fetchFilteredByCategory('meals', id);
      setSelectedCategory(id);
    }
    setMeals(filtered);
  };

  const filterById = async (type, id) => {
    const response = await fetchById(type, id);
    return response;
  };

  const filterIngredients = async (type, id) => {
    const filterRecipe = await fetchById(type, id);
    const arrayMeal = Object.entries(filterRecipe);
    const filterMeal = arrayMeal.filter((array) => array[0]
      .includes('strIngredient') && array[1] !== '');
    const result = filterMeal.map((array) => array[1]);
    return result;
  };

  const filterAllMeasure = async (type, id) => {
    const filterRecipe = await fetchById(type, id);
    const arrayMeal = Object.entries(filterRecipe);
    const filterMeasure = arrayMeal.filter((array) => array[0]
      .includes('strMeasure') && array[1] !== null);
    const result = filterMeasure.map((array) => array[1]);
    return result;
  };

  const context = {
    meals,
    setMeals,
    categories,
    setFilterCategory,
    filterIngredients,
    filterById,
    filterAllMeasure,
  };

  return (
    <MealsContext.Provider value={ context }>{children}</MealsContext.Provider>
  );
};
MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MealsContext, MealsProvider };
